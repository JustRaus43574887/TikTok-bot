import { DataSource } from "apollo-datasource";
import admin from "../../../utils/firebase";

class BloggerAPI extends DataSource {
  private db: admin.firestore.Firestore;

  constructor(db: admin.firestore.Firestore) {
    super();
    this.db = db;
  }

  async getBloggers(): Promise<AppTypes.Blogger[]> {
    const bloggers = await this.db.collection("bloggers").get();
    return bloggers.docs.map<AppTypes.Blogger>((doc) => ({
      id: doc.id,
      ...(doc.data() as AppTypes.BloggerArgs),
    }));
  }

  async createBlogger(args: AppTypes.BloggerArgs): Promise<AppTypes.Blogger> {
    const blogger = this.db.collection("bloggers").doc();
    return await new Promise((resolve, reject) =>
      blogger
        .set(args)
        .then(() => blogger.get())
        .then((doc) => {
          if (doc.exists)
            resolve({ id: doc.id, ...(doc.data() as AppTypes.BloggerArgs) });
        })
        .catch(reject)
    );
  }

  async deleteBloggers() {}
}

export default BloggerAPI;
