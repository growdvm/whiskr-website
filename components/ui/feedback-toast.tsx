"use client";

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, X, ArrowLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type FeedbackType = 'up' | 'down';

type Props = {
  visible: boolean;
  onClose: () => void;
  onFeedback?: (type: FeedbackType, reason?: string) => void;
};

const FEEDBACK_CLOSE_DELAY = 1500;

export default function FeedbackToast({ visible, onClose, onFeedback }: Props) {
  const [selected, setSelected] = useState<FeedbackType | null>(null);
  const [showReasonInput, setShowReasonInput] = useState(false);
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const closeAfterDelay = () => {
    setTimeout(() => {
      setSelected(null);
      setShowReasonInput(false);
      setReason('');
      setSubmitted(false);
      onClose();
    }, FEEDBACK_CLOSE_DELAY);
  };

  const handleThumb = (type: FeedbackType) => {
    setSelected(type);

    if (type === 'up') {
      onFeedback?.('up');
      setSubmitted(true);
      closeAfterDelay();
    } else {
      setShowReasonInput(true);
    }
  };

  const handleSubmit = () => {
    if (!reason.trim()) return;
    onFeedback?.('down', reason);
    setSubmitted(true);
    closeAfterDelay();
  };

  const handleBack = () => {
    setSelected(null);
    setShowReasonInput(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-6 right-6 z-50 w-[90vw] max-w-sm"
        >
          <motion.div
            layout
            className="rounded-xl bg-card border border-border text-foreground p-4 shadow-lg"
          >
            {!submitted ? (
              <>
                {selected === null && (
                  <motion.div layout className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">
                        How's your experience with Whiskr?
                      </p>
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label="Close"
                        onClick={onClose}
                        className="h-7 w-7 cursor-pointer text-muted-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        aria-label="Thumbs up"
                        onClick={() => handleThumb('up')}
                        className="cursor-pointer"
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        aria-label="Thumbs down"
                        onClick={() => handleThumb('down')}
                        className="cursor-pointer"
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {selected === 'down' && showReasonInput && (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">
                        What could be better?
                      </p>
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label="Close"
                        onClick={onClose}
                        className="h-7 w-7 cursor-pointer text-muted-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <Textarea
                      placeholder="Tell us what we can improve..."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full resize-none"
                      rows={3}
                    />

                    <div className="flex items-center justify-between">
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label="Back"
                        onClick={handleBack}
                        className="cursor-pointer"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={!reason.trim()}
                        className="cursor-pointer"
                      >
                        Submit
                      </Button>
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.p layout className="text-foreground text-sm">
                Thanks — we appreciate your feedback!
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
