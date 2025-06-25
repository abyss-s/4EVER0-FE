import type { UBTIQuestion } from '@/types/chat';

export function parseUBTIMessage(
  data: string,
): { question?: UBTIQuestion; completed?: boolean } | null {
  try {
    const parsed = JSON.parse(data);

    if (parsed.type === 'question_content') {
      return {
        question: {
          step: parsed.step,
          question: parsed.question,
          id: 0,
          total_steps: 0,
        },
      };
    }

    if (parsed.type === 'ubti_complete') {
      return { completed: true };
    }
  } catch (e) {
    console.warn('Failed to parse UBTI message', data);
  }

  return null;
}
