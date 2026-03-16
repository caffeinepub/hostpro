import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useCheckDomain() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (domain: string) => {
      if (!actor) throw new Error("Not connected");
      const available = await actor.checkDomainAvailability(domain);
      return { domain, available };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checked-domains"] });
    },
  });
}

export function useSignUpNewsletter() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error("Not connected");
      await actor.signUpForNewsletter(email);
    },
  });
}

export function useSubmitContact() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitContactForm(name, email, message);
    },
  });
}
