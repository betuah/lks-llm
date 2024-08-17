export const fixJsonString = (jsonString: string): object | null => {
   try {
      return JSON.parse(jsonString);
   } catch (error) {
      let fixedString = jsonString;
      fixedString = fixedString.replace(/'/g, '"');
      fixedString = fixedString.replace(/,\s*([\]}])/g, "$1");
      fixedString = fixedString.replace(/[\n\r\t]/g, "");
      try {
         return JSON.parse(fixedString);
      } catch (finalError) {
         console.error("JSON cannot be parsed:", finalError);
         return null;
      }
   }
};
