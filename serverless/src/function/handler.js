const {
   createConversation,
   updateConversation,
   getAllConversations,
   getConversationById,
   deleteConversationById,
   deleteAllConversations,
} = require("./controller");

exports.handler = async (event, context) => {
   context.callbackWaitsForEmptyEventLoop = false;

   // Parse the incoming event and route to the appropriate function
   const { httpMethod, pathParameters, body } = event;

   // Extract uid and id from pathParameters
   const { uid, id } = pathParameters || {};

   switch (httpMethod) {
      case "GET":
         if (uid && !id) {
            return await getAllConversations(uid);
         }
         if (uid && id) {
            return await getConversationById(id);
         }
         break;
      case "POST":
         if (uid && !id) {
            const requestBody = JSON.parse(body);
            requestBody.userId = uid; // Ensure userId is set in the request body
            return await createConversation(requestBody);
         }
         break;
      case "PUT":
         if (uid && id) {
            return await updateConversation(id, JSON.parse(body));
         }
         break;
      case "DELETE":
         if (uid && !id) {
            return await deleteAllConversations(uid);
         }
         if (uid && id) {
            return await deleteConversationById(id);
         }
         break;
   }

   return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request" }),
   };
};
