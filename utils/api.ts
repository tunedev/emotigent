const createURL = (path: string) => {
  return window.location.origin + path;
};

export const updateEntry = async (id: string, content: string) => {
  const res = await fetch(new Request(createURL(`/api/journals/${id}`)), {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createURL("/api/journals"), {
      method: "POST",
    })
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const askQuestion = async (question: string) => {
  const res = await fetch(new Request(createURL("/api/questions")), {
    method: "POST",
    body: JSON.stringify({ question }),
  });

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};
