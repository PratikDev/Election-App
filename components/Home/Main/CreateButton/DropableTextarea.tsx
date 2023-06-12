// react imports
import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  FC,
  SetStateAction,
  useState,
} from "react";

// helper components imports
import Question from "@/components/Helpers/Question";

// interfaces imports
import formDataType from "./shared_types/interfaces";

interface Props {
  setFormData: Dispatch<SetStateAction<formDataType>>;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const DropableTextarea: FC<Props> = ({ setFormData, onChange }) => {
  const [uploadingEmails, setUploadingEmails] = useState(false);

  const droppingBorder = [`border-dashed`, `border-2`, `border-gray-300`];

  // handle drop
  async function handleDrop(e: DragEvent<HTMLTextAreaElement>) {
    e.preventDefault();

    if (uploadingEmails) return;

    const element = e.target as HTMLTextAreaElement;

    element.classList.remove(...droppingBorder);

    const files = e.dataTransfer.files;

    if (files.length !== 1) {
      const { default: Toast } = await import("@/components/Toast");

      Toast.fire({
        icon: "error",
        title: "Only one file is allowed",
      });

      return;
    }

    if (files[0].type !== "text/csv") {
      const { default: Toast } = await import("@/components/Toast");

      Toast.fire({
        icon: "error",
        title: "Only CSV files are allowed",
      });

      return;
    }

    const reader = new FileReader();

    async function parseCSV(csvData: string) {
      const returnableData: {
        data: (undefined | string)[];
        message: string;
      } = {
        data: [undefined],
        message: ``,
      };

      try {
        setUploadingEmails(true);
        const response = await fetch(csvData);
        const data = await response.text();

        const dataArray = data.split("\n");

        const rows = dataArray.slice(0, 1000);

        const firstColumnData = rows
          .map((row) => {
            const columns = row.split(",");
            const value = columns[0].replaceAll("\r", ""); // Get the value from the first column

            // Exclude empty values and values that don't match email regex
            const emailRegex =
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (value && emailRegex.test(value)) return value;

            return undefined;
          })
          .filter((value) => value !== undefined);

        const { default: emailListValidity } = await import(
          "./shared_functions/emailListValidity"
        );

        const { data: firstColumnDataSet_unique, message } =
          emailListValidity(firstColumnData);

        returnableData.data = firstColumnDataSet_unique;
        returnableData.message = message.text;
      } catch (error) {
        const { default: Toast } = await import("@/components/Toast");

        Toast.fire({
          icon: "error",
          title: `Error occurred while parsing the CSV file`,
        });

        console.log(error);
      } finally {
        setUploadingEmails(false);
        return returnableData;
      }
    }

    reader.onload = async (e) => {
      const csvData = e.target?.result as string;

      const { data, message } = await parseCSV(csvData);

      if (data[0]) {
        element.value = data.join("\n");

        setFormData((prev) => ({
          ...prev,
          voters: data.join("\n"),
        }));

        if (message) {
          const { default: Toast } = await import("@/components/Toast");

          Toast.fire({
            icon: "warning",
            title: message,
          });
        }
      }
    };

    reader.readAsDataURL(files[0]);
  }

  // handle drop enter
  function handleDropEnter(e: DragEvent<HTMLTextAreaElement>) {
    e.preventDefault();

    const element = e.target as HTMLTextAreaElement;

    element.classList.add(...droppingBorder);
  }

  // handle drop leave
  function handleDropLeave(e: DragEvent<HTMLTextAreaElement>) {
    e.preventDefault();

    const element = e.target as HTMLTextAreaElement;

    element.classList.remove(...droppingBorder);
  }

  return (
    <>
      <div>
        <label
          htmlFor="voters"
          className="flex items-center gap-1 text-sm font-medium text-gray-700">
          <span>Type Voters Emails or Drag & Drop a CSV file (Max 1000)*</span>

          <Question
            noDark
            message={
              <>
                Only the first column from the CSV file is considered for the
                emails
              </>
            }
          />
        </label>

        <div className="mt-1 relative">
          {uploadingEmails && (
            <div
              role="status"
              className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 animate-spin text-gray-400 fill-indigo-600"
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

          <textarea
            onChange={onChange}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDragEnter={handleDropEnter}
            onDragLeave={handleDropLeave}
            onDrop={handleDrop}
            id="voters"
            name="voters"
            rows={7}
            required
            placeholder={`john@example.com\rjohn@doe.com\rdoe@john.com\rjohn.doe@gmail.com`}
            className="appearance-none block w-full p-2 px-3 border border-gray-300 disabled:border-gray-200 rounded-md shadow-sm placeholder-gray-400 disabled:placeholder-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            disabled={uploadingEmails}
          />
        </div>
      </div>
    </>
  );
};

export default DropableTextarea;
