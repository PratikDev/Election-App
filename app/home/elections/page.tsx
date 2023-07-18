import ElectionItem from "@/skeletons/components/election-item";
import { FC } from "react";

const data = [
  {
    id: 1,
    title: "Election 1",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    status: "active",
    created: "2021-01-01",
  },
  {
    id: 2,
    title: "Election 2",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    status: "active",
    created: "2021-01-01",
  },
  {
    id: 3,
    title: "Election 3",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    status: "active",
    created: "2021-01-01",
  },
  {
    id: 4,
    title: "Election 4",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    status: "active",
    created: "2021-01-01",
  },
  {
    id: 5,
    title: "Election 5",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    status: "active",
    created: "2021-01-01",
  },
  {
    id: 6,
    title: "Election 6",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    status: "active",
    created: "2021-01-01",
  },
  {
    id: 7,
    title: "Election 7",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    status: "active",
    created: "2021-01-01",
  },
  {
    id: 8,

    title: "Election 8",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    status: "inactive",
    created: "2021-01-01",
  },
];

const elections: FC = () => {
  return (
    <>
      <table cellPadding={20} className="w-full">
        <thead className="capitalize font-extralight text-sm text-center">
          <tr>
            <td colSpan={2} className="text-left py-2 pb-1">
              name
            </td>
            <td className="py-2 pb-1">status</td>
            <td className="py-2 pb-1">created</td>
          </tr>
        </thead>

        <tbody className="rounded-xl">
          {data.map((election) => (
            // <tr
            //   key={election.id}
            //   className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-200/25 dark:hover:bg-gray-800/25"
            // >
            //   <td colSpan={2} className="text-sm">
            //     <h3 className="font-semibold capitalize text-base dark:text-white truncate w-3/4 max-w-xl">
            //       {election.title}
            //     </h3>

            //     <p className="text-xs font-light text-gray-500 dark:text-gray-400 truncate w-3/4 max-w-xl">
            //       {election.desc}
            //     </p>
            //   </td>

            //   <td className="text-sm text-center capitalize">
            //     <span
            //       className={`px-2.5 py-1 rounded-full ${
            //         election.status === "active"
            //           ? "bg-green-100 text-green-500 border border-green-400 dark:border-0"
            //           : "bg-red-100 text-red-500 border border-red-400 dark:border-0"
            //       }`}
            //     >
            //       {election.status}
            //     </span>
            //   </td>

            //   <td className="text-sm text-center font-medium text-gray-600 dark:text-gray-400">
            //     {election.created}
            //   </td>
            // </tr>
            <ElectionItem />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default elections;
