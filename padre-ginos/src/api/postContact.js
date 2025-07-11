async function postContact(email, name, message) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ name, email, message }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok. Send help.");
  }

  const data = await response.json();

  return data;
}

export { postContact };
