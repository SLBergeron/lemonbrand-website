// Types for the Brilliant-style step-based learning experience

export type StepType =
  | 'text'
  | 'multiple-choice'
  | 'drag-drop'
  | 'build'
  | 'compare'
  | 'reveal'
  | 'completion';

// Base step interface
export interface BaseStep {
  id: string;
  type: StepType;
}

// Text step - displays content with optional visuals
export interface TextStep extends BaseStep {
  type: 'text';
  content: {
    title?: string;
    body: string;
    highlight?: 'quote' | 'stat' | 'tip';
    visual?: {
      type: 'image' | 'icon';
      src?: string;
      icon?: string;
    };
  };
}

// Multiple choice step - select one option
export interface MultipleChoiceStep extends BaseStep {
  type: 'multiple-choice';
  content: {
    question: string;
    options: {
      id: string;
      label: string;
      description?: string;
      isCorrect?: boolean; // undefined means no wrong answer
    }[];
    feedback?: {
      correct?: string;
      incorrect?: string;
      neutral?: string; // For questions with no wrong answer
    };
    allowMultiple?: boolean;
  };
}

// Drag and drop step - sort items into categories
export interface DragDropStep extends BaseStep {
  type: 'drag-drop';
  content: {
    instruction: string;
    items: {
      id: string;
      label: string;
      correctZone: string;
    }[];
    zones: {
      id: string;
      label: string;
      description?: string;
    }[];
  };
}

// Build step - fill in blanks to create something
export interface BuildStep extends BaseStep {
  type: 'build';
  content: {
    title: string;
    description?: string;
    fields: {
      id: string;
      label: string;
      type: 'dropdown' | 'text' | 'checkbox';
      options?: string[];
      placeholder?: string;
    }[];
    template?: string; // Template to show assembled result
    showResult?: boolean;
  };
}

// Compare step - side by side comparison
export interface CompareStep extends BaseStep {
  type: 'compare';
  content: {
    title: string;
    left: {
      label: string;
      content: string;
      style: 'bad' | 'neutral';
    };
    right: {
      label: string;
      content: string;
      style: 'good' | 'neutral';
    };
    explanation?: string;
  };
}

// Reveal step - click to reveal hidden content
export interface RevealStep extends BaseStep {
  type: 'reveal';
  content: {
    prompt: string;
    buttonLabel?: string;
    revealType: 'text' | 'stat' | 'gallery';
    hiddenContent: string | string[];
    caption?: string;
  };
}

// Completion step - celebrate and show badge earned
export interface CompletionStep extends BaseStep {
  type: 'completion';
  content: {
    badge: {
      name: string;
      icon: string;
      xp: number;
    };
    message?: string;
  };
}

// Union type for all steps
export type Step =
  | TextStep
  | MultipleChoiceStep
  | DragDropStep
  | BuildStep
  | CompareStep
  | RevealStep
  | CompletionStep;

// Page definition
export interface Page {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  steps: Step[];
  badge: {
    name: string;
    icon: string;
    xp: number;
  };
}

// Progress state for a step
export interface StepProgress {
  stepId: string;
  completed: boolean;
  answer?: any; // Stores user's selection/input
  correct?: boolean; // For steps with right/wrong answers
}
