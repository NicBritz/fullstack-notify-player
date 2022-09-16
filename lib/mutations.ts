import fetcher from "./fetcher";

export const auth = (
  mode: "signin" | "signup",
  body: { email: string; password: string; firstname: string; lastname: string }
) => {
  return fetcher(`/${mode}`, body);
};
