import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { handlePostState } from "../atoms/postAtom";

function Form() {
  const [input, setInput] = useState("");
  const [photo, setPhoto] = useState("");
  const { data: session } = useSession();
  const [, setModalOpen] = useRecoilState(modalState);
  const [, setHandlePost] = useRecoilState(handlePostState);

  const uploadPost = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        input,
        photo,
        username: session.user.name,
        email: session.user.email,
        userImg: session.user.image,
        createdAt: new Date().toString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await response.json();
    setHandlePost(true);
    setModalOpen(false);
  };

  return (
    <form className="flex flex-col relative space-y-2 text-black/80 dark:text-white/75">
      <textarea
        placeholder="What do you want to talk about?"
        rows="4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="bg-transparent focus:outline-none dark:placeholder-white/75"
      />

      <input
        type="text"
        placeholder="Add a photo url (optional)"
        className="bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm dark:placeholder-white/75"
        onChange={(e) => setPhoto(e.target.value)}
        value={photo}
      />

      <button
        className="absolute bottom-0 right-0 font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black/40 disabled:bg-white/75 disabled:cursor-not-allowed text-white rounded-full px-3.5 py-1"
        disabled={!input.trim() && !photo.trim()}
        type="submit"
        onClick={uploadPost}
      >
        Post
      </button>
    </form>
  );
}

export default Form;
