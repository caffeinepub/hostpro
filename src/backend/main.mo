import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

actor {
  type ContactForm = {
    name : Text;
    email : Text;
    message : Text;
  };

  let checkedDomains = Map.empty<Text, Bool>();
  let newsletterEmails = Map.empty<Text, ()>();
  let contactForms = Map.empty<Text, ContactForm>();

  public shared ({ caller }) func checkDomainAvailability(domain : Text) : async Bool {
    switch (checkedDomains.get(domain)) {
      case (?availability) { availability };
      case (null) {
        let isAvailable = domain.size() % 2 == 0;
        checkedDomains.add(domain, isAvailable);
        isAvailable;
      };
    };
  };

  public shared ({ caller }) func signUpForNewsletter(email : Text) : async () {
    if (newsletterEmails.containsKey(email)) { Runtime.trap("Email already subscribed") };
    newsletterEmails.add(email, ());
  };

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    if (contactForms.containsKey(email)) { Runtime.trap("Contact form already submitted") };
    contactForms.add(email, { name; email; message });
  };

  public query ({ caller }) func getAllCheckedDomains() : async [(Text, Bool)] {
    checkedDomains.entries().toArray();
  };

  public query ({ caller }) func getAllNewsletterEmails() : async [Text] {
    newsletterEmails.keys().toArray();
  };

  public query ({ caller }) func getAllContactForms() : async [ContactForm] {
    contactForms.values().toArray();
  };
};
