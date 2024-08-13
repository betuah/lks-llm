const conversationsSchema = {
   tableName: "conversations",
   columns: {
      id: "UUID PRIMARY KEY",
      title: "TEXT NOT NULL",
      conversation: "JSONB NOT NULL",
      embedding: "vector(768)",
      user_id: "UUID NOT NULL",
      createdAt: "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP",
      updatedAt: "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP",
   },
};

module.exports = {
   conversationsSchema,
};
