
import { zodResolver } from "@hookform/resolvers/zod";
import { useSurvey } from "./use-survey";
import { surveySubmissionSchema } from "@/domains/schema/Survey/survey.schema";
import { useForm } from "react-hook-form";

export const useSurveyForm = () => {
  const { createSurveySubmission } = useSurvey();

  const form = useForm({
    resolver: zodResolver(surveySubmissionSchema),
    defaultValues: {
      answers: [
        
      ],
    },
  });


  const onSubmit = async (data) => {
    await createSurveySubmission.mutateAsync(data);
    form.reset();
  };

  return {
    form,
    onSubmit,
    isLoading: createSurveySubmission.isPending,
  };
};
