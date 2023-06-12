"use client";

// react imports
import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";

// helper component imports
import Question from "@/components/Helpers/Question";

// component imports
import DropableTextarea from "./DropableTextarea";

// interfaces imports
import formDataType from "./shared_types/interfaces";

function handleModalToggle(setIsShowing: Dispatch<SetStateAction<Boolean>>) {
  setIsShowing((isShowing) => !isShowing);
}

const Form: FC<{ setIsShowing: Dispatch<SetStateAction<Boolean>> }> = ({
  setIsShowing,
}) => {
  const [isMulti, setIsMulti] = useState(false);
  const [creatingElection, setCreatingElection] = useState(false);

  const [formData, setFormData] = useState<formDataType>({
    title: "",
    description: "",
    number_of_choices: 1,
    voters: "",
  });

  // handle change event
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const element = e.target as HTMLInputElement | HTMLTextAreaElement;

    setFormData((prev) => ({
      ...prev,
      [element.name]: element.value,
    }));
  }

  // handle submit
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (creatingElection) return;

    const { title, description, number_of_choices, voters } = formData;

    // validate title
    if (!title || title.length < 10 || title.length > 150) {
      const { default: Toast } = await import("@/components/Toast");

      Toast.fire({
        icon: "error",
        title: `Title must be between 10 to 150 characters`,
      });

      return;
    }

    // validate description
    if (!description || description.length < 10 || description.length > 2000) {
      const { default: Toast } = await import("@/components/Toast");

      Toast.fire({
        icon: "error",
        title: `Description must be between 10 to 2000 characters`,
      });

      return;
    }

    // validate number of choices
    if (
      (isMulti && number_of_choices < 2) ||
      number_of_choices < 1 ||
      number_of_choices > 20
    ) {
      const { default: Toast } = await import("@/components/Toast");

      Toast.fire({
        icon: "error",
        title: `Number of Selections must be between 2 to 20`,
      });

      return;
    }

    const voter_array = voters.split("\n");

    const { default: emailListValidity } = await import(
      "./shared_functions/emailListValidity"
    );

    const { data: voter_array_unique, message } =
      emailListValidity(voter_array);

    if (message.text) {
      const { default: Toast } = await import("@/components/Toast");

      Toast.fire({
        icon: message.complexity,
        html: message.text,
      });

      // if function should be terminated
      if (message.shouldTerminate) return;
    }

    const confirm = window.confirm("Are you sure about all the entered info?");

    if (!confirm) return;

    try {
      setCreatingElection(true);

      const { databases } = await import("@/appwrite/appwrite-config");
      const { database_id, election_collection_id } = await import(
        "@/appwrite/appwrite-IDs"
      );
      const { ID } = await import("appwrite");
      const { uid } = await import("@/helpers/uid");

      const storableData = {
        title,
        description,
        number_of_choices,
        voters: voter_array_unique,
        uid: uid(25),
      };

      await databases.createDocument(
        database_id,
        election_collection_id,
        ID.unique(),
        storableData
      );

      handleModalToggle(setIsShowing);

      const { default: Swal } = await import("sweetalert2");

      Swal.fire({
        icon: "success",
        title: "Election created successfully",
      });
    } catch (error) {
      console.log(error);

      const { default: Toast } = await import("@/components/Toast");

      Toast.fire({
        icon: "error",
        title: `Something went wrong! Please try again later`,
      });
    } finally {
      setCreatingElection(false);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mt-3 w-100">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700">
            Election Title*
          </label>

          <div className="mt-1">
            <input
              onChange={handleChange}
              id="title"
              name="title"
              minLength={10}
              maxLength={150}
              placeholder="Give a title to your election"
              required
              type="text"
              className="appearance-none block w-full p-2 px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700">
            Election Description*
          </label>

          <div className="mt-1">
            <textarea
              onChange={handleChange}
              id="description"
              name="description"
              rows={4}
              required
              minLength={10}
              maxLength={2000}
              placeholder="Write something about the election"
              className="appearance-none block w-full p-2 px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 w-100">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                onChange={() => setIsMulti((prev) => !prev)}
                type="checkbox"
                name="isMulti"
                id="isMulti"
                className="sr-only peer"
              />
              <div
                className="w-9
                          h-5
                          peer
                          bg-gray-200
                          border
                          border-gray-300
                          peer-focus:outline-none
                          rounded-full
                          peer-checked:after:translate-x-full
                          peer-checked:after:border-white 
                          after:content-['']
                          after:absolute
                          after:top-[2px]
                          after:left-[2px]
                          after:bg-white
                          after:border-gray-400
                          after:border
                          after:rounded-full
                          after:h-4
                          after:w-4
                          after:transition-all
                          peer-checked:bg-indigo-500"></div>

              <div className="flex items-center gap-1">
                <span className="ml-3 text-sm font-medium text-gray-900">
                  Multi Choice Voting
                </span>
                {isMulti && (
                  <Question
                    noDark
                    message={
                      <>
                        <strong>REMEMBER</strong>: This value can&apos;t be
                        greater than the total candidates of your Election or
                        vice-versa. Total candidates can be maximum of 20 per
                        Election
                      </>
                    }
                  />
                )}
              </div>
            </label>

            {isMulti && (
              <div className="grow">
                <input
                  onChange={handleChange}
                  type="number"
                  id="number_of_choices"
                  name="number_of_choices"
                  min={2}
                  max={20}
                  placeholder="Number of selections a voter can make"
                  required={isMulti}
                  className="appearance-none block w-full p-2 px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            )}
          </div>
        </div>

        <DropableTextarea
          setFormData={setFormData}
          onChange={handleChange}
        />

        <div>
          <button
            type="submit"
            disabled={creatingElection}
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 outline-none disabled:opacity-75 text-white px-3 py-1.5 rounded-md float-right">
            {creatingElection && (
              <div
                role="status"
                className="flex">
                <svg
                  aria-hidden="true"
                  className="inline w-4 h-4 text-gray-500 animate-spin fill-gray-100"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
            <span>Create</span>
          </button>
        </div>
      </form>
    </>
  );
};

const Modal: FC<{ setIsShowing: Dispatch<SetStateAction<Boolean>> }> = ({
  setIsShowing,
}) => {
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleModalToggle(setIsShowing);
        }
      }}
      className="clickable grid place-items-center fixed top-0 left-0 z-20 w-screen h-screen bg-black/25 backdrop-blur-sm text-gray-900">
      <div className="flex flex-col justify-between gap-2 w-4/5 sm:w-1/2 rounded-md bg-white p-4 px-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-medium">
            Create Your Election
          </h1>
        </div>

        <Form setIsShowing={setIsShowing} />
      </div>
    </div>
  );
};

const CreateButton: FC = () => {
  const [isShowing, setIsShowing] = useState<Boolean>(true);

  return (
    <>
      {isShowing && <Modal setIsShowing={setIsShowing} />}

      <button
        onClick={() => handleModalToggle(setIsShowing)}
        className="flex
                    gap-1
                    items-center
                    rounded-md
                    font-medium
                    text-gray-200
                    px-3
                    py-1.5
                    bg-indigo-600
                    hover:bg-indigo-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="currentColor"
          className="w-4 h-4">
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
        </svg>
        <span>Create Election</span>
      </button>
    </>
  );
};

export default CreateButton;
