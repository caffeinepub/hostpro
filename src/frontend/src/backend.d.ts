import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactForm {
    name: string;
    email: string;
    message: string;
}
export interface backendInterface {
    checkDomainAvailability(domain: string): Promise<boolean>;
    getAllCheckedDomains(): Promise<Array<[string, boolean]>>;
    getAllContactForms(): Promise<Array<ContactForm>>;
    getAllNewsletterEmails(): Promise<Array<string>>;
    signUpForNewsletter(email: string): Promise<void>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
}
