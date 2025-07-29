import { Product, Category } from "@/types/product";
import { Config } from "@/types/config";

const api = {
  product: {
    list: async (): Promise<Product[]> => {
      return fetch(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vTd-h81jgOFP9I0braMk-TvCC_MWt7g840PbETtbGhnugqK9w9vqhafoPzMQCcm0YT2hpZITwmrpoci/pub?output=tsv")
        // "https://docs.google.com/spreadsheets/d/e/2PACX-1vTd-h81jgOFP9I0braMk-TvCC_MWt7g840PbETtbGhnugqK9w9vqhafoPzMQCcm0YT2hpZITwmrpoci/pub?gid=0&single=true&output=csv")
        .then(res => res.text())
        .then(text => {
          return text.split('\n').slice(1).map((row, index) => {
            const [cant, name, status, image, price, category] = row.split('\t')
            return {
              id: String(index + 2),
              cant: parseInt(cant),
              name,
              status,
              image,
              price: parseFloat(price),
              category: category?.trim(),
            }
          });
        });
    }
  },
  // category: {
  //   list: async (): Promise<Category[]> => {
  //     const seen = new Set<string>();
  //     return fetch(
  //       // "https://docs.google.com/spreadsheets/d/e/2PACX-1vTd-h81jgOFP9I0braMk-TvCC_MWt7g840PbETtbGhnugqK9w9vqhafoPzMQCcm0YT2hpZITwmrpoci/pub?output=tsv")
  //       "https://docs.google.com/spreadsheets/d/e/2PACX-1vTd-h81jgOFP9I0braMk-TvCC_MWt7g840PbETtbGhnugqK9w9vqhafoPzMQCcm0YT2hpZITwmrpoci/pub?gid=812795288&single=true&output=csv")
  //       .then(res => res.text())
  //       .then(text => {
  //         return text.split('\n').slice(1).map(row => {
  //           const [, , , , , category] = row.split('\t');
  //           const name = category?.trim();
  //           if (name && !seen.has(name)) {
  //             seen.add(name);
  //             return { name };
  //           }
  //           return null;

  //         }).filter((item): item is Category => item !== null);
  //       })
  //   }
  // }


  category: {
    list: async (): Promise<Category[]> => {
      return fetch(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vTd-h81jgOFP9I0braMk-TvCC_MWt7g840PbETtbGhnugqK9w9vqhafoPzMQCcm0YT2hpZITwmrpoci/pub?gid=812795288&single=true&output=tsv")
        .then(res => res.text())
        .then(text => {
          return text.split('\n').slice(1).map((row, index) => {
            const [name, image] = row.split('\t');
            return {
              id: String(index + 2),
              name: name.trim(),
              image: image.trim()
            }
          }).filter(Boolean) as Category[];
        })
    }
  },
  config: {
    list: async (): Promise<Config[]> => {
      return fetch(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vTd-h81jgOFP9I0braMk-TvCC_MWt7g840PbETtbGhnugqK9w9vqhafoPzMQCcm0YT2hpZITwmrpoci/pub?gid=1490941533&single=true&output=tsv")
        .then(res => res.text())
        .then(text => {
          return text.split('\n').slice(1).map((row, index) => {
            const [logotipo, color, phone, banner, message] = row.split('\t');
            return {
              logotipo,
              color,
              phone: parseInt(phone),
              banner,
              message
            }
          })
        })
    }
  }

}
export default api;

