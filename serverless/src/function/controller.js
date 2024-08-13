const db = require("./db");
const { conversationsSchema } = require("./schema");

const resBody = (status, body) => {
   return {
      statusCode: status,
      headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
         "Access-Control-Allow-Headers": "*",
         "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
   };
};

const createConversation = async (requestBody) => {
   const { id, title, conversation, embedding, userId } = requestBody;

   if (!id || !title || !Array.isArray(conversation) || !userId) {
      return resBody(400, {
         status: "error",
         message: "Invalid input",
      });
   }

   try {
      await db.getDb();
      const query = `
         INSERT INTO ${conversationsSchema.tableName} 
         (id, title, conversation, embedding, user_id) 
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) 
         DO UPDATE SET 
            title = EXCLUDED.title, 
            conversation = EXCLUDED.conversation, 
            embedding = EXCLUDED.embedding, 
            user_id = EXCLUDED.user_id
      `;

      await db.query(query, [
         id,
         title,
         JSON.stringify(conversation),
         embedding,
         userId,
      ]);

      return resBody(200, {
         status: "success",
         message: "Conversation created successfully",
      });
   } catch (error) {
      console.error("Error in createConversation:", error);
      return resBody(500, {
         status: "error",
         message: "Internal server error",
         error: error.message,
      });
   }
};

const getAllConversations = async (userId) => {
   try {
      await db.getDb(); // Ensure connection is established and logged
      const query = `SELECT * FROM ${conversationsSchema.tableName} WHERE user_id = $1`;
      const result = await db.query(query, [userId]);
      return resBody(200, {
         status: "success",
         data: result.rows,
      });
   } catch (error) {
      console.error("Error in getAllConversations:", error);
      return resBody(500, {
         status: "error",
         message: "Internal server error",
         error: error.message,
      });
   }
};

const getConversationById = async (id) => {
   try {
      await db.getDb(); // Ensure connection is established and logged
      const query = `SELECT * FROM ${conversationsSchema.tableName} WHERE id = $1`;
      const result = await db.query(query, [id]);

      if (result.rows.length === 0) {
         return resBody(404, {
            status: "error",
            message: "Conversation not found",
         });
      }

      return resBody(200, {
         status: "success",
         data: result.rows[0],
      });
   } catch (error) {
      console.error("Error in getConversationById:", error);
      return resBody(500, {
         status: "error",
         message: "Internal server error",
         error: error.message,
      });
   }
};

const updateConversation = async (id, requestBody) => {
   const { title, conversation, embedding } = requestBody;

   if (!title && !conversation && !embedding) {
      return resBody(400, {
         status: "error",
         message: "No fields to update",
      });
   }

   try {
      await db.getDb(); // Ensure connection is established and logged
      let updateFields = [];
      let values = [];
      let paramCount = 1;

      if (title) {
         updateFields.push(`title = $${paramCount}`);
         values.push(title);
         paramCount++;
      }
      if (conversation) {
         updateFields.push(`conversation = $${paramCount}`);
         values.push(JSON.stringify(conversation));
         paramCount++;
      }
      if (embedding) {
         updateFields.push(`embedding = $${paramCount}`);
         values.push(embedding);
         paramCount++;
      }

      values.push(id);

      const query = `UPDATE ${conversationsSchema.tableName} 
                   SET ${updateFields.join(", ")} 
                   WHERE id = $${paramCount}`;

      const result = await db.query(query, values);

      if (result.rowCount === 0) {
         return resBody(404, {
            status: "error",
            message: "Conversation not found",
         });
      }

      return resBody(200, {
         status: "success",
         message: "Conversation updated successfully",
      });
   } catch (error) {
      console.error("Error in updateConversation:", error);
      return resBody(500, {
         status: "error",
         message: "Internal server error",
         error: error.message,
      });
   }
};

const deleteConversationById = async (id) => {
   try {
      await db.getDb(); // Ensure connection is established and logged
      const query = `DELETE FROM ${conversationsSchema.tableName} WHERE id = $1`;
      const result = await db.query(query, [id]);

      if (result.rowCount === 0) {
         return resBody(404, {
            status: "error",
            message: "Conversation not found",
         });
      }

      return resBody(200, {
         status: "success",
         message: "Conversation deleted successfully",
      });
   } catch (error) {
      console.error("Error in deleteConversationById:", error);

      return resBody(500, {
         status: "error",
         message: "Internal server error",
         error: error.message,
      });
   }
};

const deleteAllConversations = async (userId) => {
   try {
      await db.getDb(); // Ensure connection is established and logged
      const query = `DELETE FROM ${conversationsSchema.tableName} WHERE user_id = $1`;
      const result = await db.query(query, [userId]);

      return resBody(200, {
         status: "success",
         message: `${result.rowCount} conversations deleted successfully for user ${userId}`,
      });
   } catch (error) {
      console.error("Error in deleteAllConversations:", error);
      return resBody(500, {
         status: "error",
         message: "Internal server error",
         error: error.message,
      });
   }
};

module.exports = {
   createConversation,
   getAllConversations,
   getConversationById,
   updateConversation,
   deleteConversationById,
   deleteAllConversations,
};
