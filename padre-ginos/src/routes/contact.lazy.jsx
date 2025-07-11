import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { postContact } from "../api/postContact";

export const Route = createLazyFileRoute("/contact")({
  component: ContactComponent,
});

function ContactComponent() {
  const mutation = useMutation({
    mutationKey: ["contact"],
    mutationFn: function (event) {
      event.preventDefault();

      const formData = new FormData(event.target);

      return postContact(
        formData.get("name"),
        formData.get("email"),
        formData.get("message"),
      );
    },
  });

  return (
    <div className="contact">
      <h2>Contact</h2>
      {mutation.isSuccess ? (
        <h3>Submitted!</h3>
      ) : (
        <form onSubmit={mutation.mutate}>
          <input name="name" placeholder="Name" />
          <input type="email" name="email" placeholder="Email" />
          <textarea placeholder="Message" name="message"></textarea>
          <button>Submit</button>
        </form>
      )}
    </div>
  );
}
