import isEmailValidRegex from "@/helpers/emailFormateValidation";
import { SweetAlertIcon } from "sweetalert2";

/**
 *
 * @param emailList List of emails
 * @returns Checks the validity of the email list and returns the validity status and the list of unique emails
 */
const emailListValidity = (emailList: string[]) => {
  const returnableData: {
    data: string[];
    message: {
      shouldTerminate: boolean;
      text: string;
      complexity: SweetAlertIcon;
    };
  } = {
    data: [``],
    message: {
      shouldTerminate: false,
      text: ``,
      complexity: `warning`,
    },
  };

  const firstColumnDataSet_unique = Array.from(new Set(emailList));

  if (firstColumnDataSet_unique.length !== emailList.length) {
    returnableData.message.text = `Duplicate Emails found. Duplicates are merged.`;
  }

  // validate voter emails
  for (const voter of firstColumnDataSet_unique) {
    const valid = isEmailValidRegex(voter);

    if (!valid) {
      returnableData.message.text = `<p style="font-size: 0.8rem">Invalid email: <span style="padding: 0.1rem 0.25rem; background-color: #d1d5db; border-radius: 0.25rem; font-weight: 500;">${voter}</span><br/>Please make sure if all emails are valid & separated by line breaks</p>`;
      returnableData.message.shouldTerminate = true;
      returnableData.message.complexity = `error`;

      return returnableData;
    }
  }

  if (firstColumnDataSet_unique.length < 10) {
    returnableData.message.text = `Only ${firstColumnDataSet_unique.length} valid and unique emails found. At least 10 required`;
    returnableData.message.shouldTerminate = true;
    returnableData.message.complexity = `error`;

    return returnableData;
  }

  if (firstColumnDataSet_unique.length > 1001) {
    returnableData.message.text = `More than 1000 emails found. Only first 1000s are listed`;
  }

  returnableData.data = firstColumnDataSet_unique;

  return returnableData;
};

export default emailListValidity;
