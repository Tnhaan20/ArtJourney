import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  sessionSchema, 
  artworkDetailArraySchema,  // Change to array schema
  artworkArraySchema,
  challengeArraySchema
} from "@/domains/schema/Gamification/gamification.schema";
import { useGamification } from "./use-gamification";

export const useGamificationForm = () => {
  const { 
    createChallengeMutation, 
    createSession, 
    createArtwork, 
    createArtworkDetail 
  } = useGamification();

  // Challenge Form - sends array of challenges
  const useChallengeForm = (defaultValues = {}) => {
    const form = useForm({
      resolver: zodResolver(challengeArraySchema),
      defaultValues: [
        {
          name: "",
          description: "",
          challengeType: "",
          durationSeconds: 0,
          courseId: 0,
          ...defaultValues,
        }
      ],
    });

    const onSubmit = async (data) => {
      try {
        // data is already an array of challenges
        await createChallengeMutation.mutateAsync(data);
        form.reset();
      } catch (error) {
        console.error("Challenge creation failed:", error);
      }
    };

    return {
      form,
      onSubmit: form.handleSubmit(onSubmit),
      isLoading: createChallengeMutation.isPending,
      isSuccess: createChallengeMutation.isSuccess,
      error: createChallengeMutation.error,
    };
  };

  // Session Form
  const useSessionForm = (defaultValues = {}) => {
    const form = useForm({
      resolver: zodResolver(sessionSchema),
      defaultValues: {
        userId: 0,
        challengeId: 0,
        score: 0,
        timeTaken: 0,
        isCompleted: false,
        ...defaultValues,
      },
    });

    const onSubmit = async (data) => {
      try {
        await createSession.mutateAsync(data);
        form.reset();
      } catch (error) {
        console.error("Session creation failed:", error);
      }
    };

    return {
      form,
      onSubmit: form.handleSubmit(onSubmit),
      isLoading: createSession.isPending,
      isSuccess: createSession.isSuccess,
      error: createSession.error,
    };
  };

  // Artwork Detail Form - sends array of artwork details
  const useArtworkDetailForm = (defaultValues = {}) => {
    const form = useForm({
      resolver: zodResolver(artworkDetailArraySchema),
      defaultValues: [
        {
          artist: "",
          period: "",
          year: "",
          artworkId: 0,
          ...defaultValues,
        }
      ],
    });

    const onSubmit = async (data) => {
      try {
        // data is already an array of artwork details
        await createArtworkDetail.mutateAsync(data);
        form.reset();
      } catch (error) {
        console.error("Artwork detail creation failed:", error);
      }
    };

    return {
      form,
      onSubmit: form.handleSubmit(onSubmit),
      isLoading: createArtworkDetail.isPending,
      isSuccess: createArtworkDetail.isSuccess,
      error: createArtworkDetail.error,
    };
  };

  // Artwork Form - sends array of artworks
  const useArtworkForm = (defaultValues = {}) => {
    const form = useForm({
      resolver: zodResolver(artworkArraySchema),
      defaultValues: [
        {
          image: "",
          title: "",
          challengeId: 0,
          ...defaultValues,
        }
      ],
    });

    const onSubmit = async (data) => {
      try {
        // data is already an array of artworks
        await createArtwork.mutateAsync(data);
        form.reset();
      } catch (error) {
        console.error("Artwork creation failed:", error);
      }
    };

    return {
      form,
      onSubmit: form.handleSubmit(onSubmit),
      isLoading: createArtwork.isPending,
      isSuccess: createArtwork.isSuccess,
      error: createArtwork.error,
    };
  };

  return {
    useChallengeForm,
    useSessionForm,
    useArtworkDetailForm,
    useArtworkForm,
  };
};