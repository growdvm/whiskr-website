"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const VS_SOURCE = `
  attribute vec4 aVertexPosition;
  void main() {
    gl_Position = aVertexPosition;
  }
`;

const FS_SOURCE = `
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;

  const float overallSpeed = 0.13;
  const float gridSmoothWidth = 0.015;
  const float scale = 5.0;
  const vec3 lineColor = vec3(0.11, 0.91, 0.51);
  const float lineAlpha = 0.55;
  const float minLineWidth = 0.008;
  const float maxLineWidth = 0.14;
  const float lineSpeed = 1.0 * overallSpeed;
  const float lineAmplitude = 1.0;
  const float lineFrequency = 0.2;
  const float warpSpeed = 0.2 * overallSpeed;
  const float warpFrequency = 0.5;
  const float warpAmplitude = 1.0;
  const float offsetFrequency = 0.5;
  const float offsetSpeed = 1.33 * overallSpeed;
  const float minOffsetSpread = 0.6;
  const float maxOffsetSpread = 2.0;
  const int linesPerGroup = 16;

  #define drawCircle(pos, radius, coord) smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
  #define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))
  #define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))

  float random(float t) {
    return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
  }

  float getPlasmaY(float x, float offset) {
    return random(x * lineFrequency + iTime * lineSpeed) * lineAmplitude + offset;
  }

  void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 uv = fragCoord.xy / iResolution.xy;
    vec2 space = (fragCoord - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;

    space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude;
    space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * 0.5;

    float intensity = 0.0;

    for(int l = 0; l < linesPerGroup; l++) {
      float normalizedLineIndex = float(l) / float(linesPerGroup);
      float offsetTime = iTime * offsetSpeed;
      float offsetPosition = float(l) + space.x * offsetFrequency;
      float rand = random(offsetPosition + offsetTime) * 0.5 + 0.5;
      float halfWidth = mix(minLineWidth, maxLineWidth, rand) / 2.0;
      float offset = random(offsetPosition + offsetTime * (1.0 + normalizedLineIndex)) * mix(minOffsetSpread, maxOffsetSpread, 1.0);
      float linePosition = getPlasmaY(space.x, offset);
      float line = drawSmoothLine(linePosition, halfWidth, space.y) / 2.0 + drawCrispLine(linePosition, halfWidth * 0.15, space.y);

      float circleX = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
      vec2 circlePosition = vec2(circleX, getPlasmaY(circleX, offset));
      float circle = drawCircle(circlePosition, 0.008, space) * 3.0;

      intensity = max(intensity, max(line, circle) * rand);
    }

    float edgeFade = smoothstep(0.0, 0.08, uv.x) * smoothstep(1.0, 0.92, uv.x);
    edgeFade *= smoothstep(0.0, 0.06, uv.y) * smoothstep(1.0, 0.94, uv.y);
    float alpha = intensity * lineAlpha * edgeFade;

    gl_FragColor = vec4(lineColor * alpha, alpha);
  }
`;

const POSITIONS = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);

type ShaderBackgroundProps = {
  className?: string;
  reducedMotion?: boolean;
};

function loadShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string): WebGLProgram | null {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vertexShader || !fragmentShader) return null;

  const shaderProgram = gl.createProgram();
  if (!shaderProgram) return null;

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error("Shader program link error:", gl.getProgramInfoLog(shaderProgram));
    gl.deleteProgram(shaderProgram);
    return null;
  }

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  return shaderProgram;
}

function renderFrame(
  gl: WebGLRenderingContext,
  programInfo: {
    program: WebGLProgram;
    attribLocations: { vertexPosition: number };
    uniformLocations: { resolution: WebGLUniformLocation | null; time: WebGLUniformLocation | null };
  },
  positionBuffer: WebGLBuffer,
  width: number,
  height: number,
  time: number,
) {
  gl.viewport(0, 0, width, height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.useProgram(programInfo.program);
  gl.uniform2f(programInfo.uniformLocations.resolution, width, height);
  gl.uniform1f(programInfo.uniformLocations.time, time);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

export default function ShaderBackground({ className, reducedMotion = false }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const frozenTimeRef = useRef<number>(2.5);
  const reducedMotionRef = useRef(reducedMotion);
  const [webglFailed, setWebglFailed] = useState(false);

  reducedMotionRef.current = reducedMotion;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true });
    if (!gl) {
      setWebglFailed(true);
      return;
    }

    const shaderProgram = initShaderProgram(gl, VS_SOURCE, FS_SOURCE);
    if (!shaderProgram) {
      setWebglFailed(true);
      return;
    }

    const positionBuffer = gl.createBuffer();
    if (!positionBuffer) {
      setWebglFailed(true);
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, POSITIONS, gl.STATIC_DRAW);

    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      },
      uniformLocations: {
        resolution: gl.getUniformLocation(shaderProgram, "iResolution"),
        time: gl.getUniformLocation(shaderProgram, "iTime"),
      },
    };

    const resizeCanvas = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(width * dpr));
      const h = Math.max(1, Math.floor(height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resizeCanvas();

    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(container);

    const tick = () => {
      if (reducedMotionRef.current) {
        renderFrame(gl, programInfo, positionBuffer, canvas.width, canvas.height, frozenTimeRef.current);
        return;
      }

      const currentTime = (Date.now() - startTimeRef.current) / 1000;
      frozenTimeRef.current = currentTime;
      resizeCanvas();
      renderFrame(gl, programInfo, positionBuffer, canvas.width, canvas.height, currentTime);
      rafRef.current = requestAnimationFrame(tick);
    };

    if (reducedMotionRef.current) {
      renderFrame(gl, programInfo, positionBuffer, canvas.width, canvas.height, frozenTimeRef.current);
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      observer.disconnect();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(shaderProgram);
    };
  }, []);

  if (webglFailed) return null;

  return (
    <div ref={containerRef} className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}>
      <canvas ref={canvasRef} className="block w-full h-full bg-transparent" aria-hidden="true" />
    </div>
  );
}
