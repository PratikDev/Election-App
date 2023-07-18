import { FC } from "react";
import Description from "../description";
import Title from "../title";

const ElectionItem: FC = () => {
  return (
    <>
      <tr className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-200/25 dark:hover:bg-gray-800/25">
        <td colSpan={2} className="text-sm">
          <Title width="w-32" additionalClasses={`mt-0`} />
          <Description width="w-64" additionalClasses={`mb-0`} />
        </td>

        <td className="text-sm text-center capitalize">
          <Title width="w-12" additionalClasses={`mx-auto my-0`} />
        </td>

        <td className="text-sm text-center font-medium text-gray-600 dark:text-gray-400">
          <Title width="w-1/2" additionalClasses={`mx-auto my-0`} />
        </td>
      </tr>
    </>
  );
};

export default ElectionItem;
