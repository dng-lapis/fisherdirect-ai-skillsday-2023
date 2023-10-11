/* Amplify Params - DO NOT EDIT
	AUTH_FISHERDIRECTAISKILLSF8CCCF35_USERPOOLID
	ENV
	INTERACTIONS_LEXAIBOT_BOTNAME
	REGION
	STORAGE_S38DF28C03_BUCKETNAME
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const renewTypeOnline = event.currentIntent.slots.RenewType;

  console.log(renewTypeOnline);

  // Here, you can implement logic to store the user's name and email address, send a confirmation email, etc.

  const response = {
    dialogAction: {
      type: "Close",
      fulfillmentState: "Fulfilled",
      message: {
        contentType: "PlainText",
        content: `${
          renewTypeOnline === "yes" || renewTypeOnline === "Yes"
            ? "Check things TO DO on the homepage"
            : "Contact NSW Fisheries on 04013333444"
        }`,
      },
    },
  };

  return response;
};
