import { redisService } from "@/core/services/redis.service";
import { PostFlowDTOArraySchema } from "@repo/shared/features/posts/post/dtoValidation";
import { PostFlowResponse as PostFlowDTO } from "@repo/shared/features/posts/post/types";

interface CacheConfig {
  [key: string]: {
    [key: string]: string | number;
  };
}

export class PostCache {
  public static readonly CACHE_CONFIG: CacheConfig = {
    postCache: {
      key: "cached-posts",
      ttl: 60 * 60 * 6,
    },
  };

  static async updatePostCache(posts: PostFlowDTO[]) {
    const parsedPosts = PostFlowDTOArraySchema.parse(posts);
    await redisService.del(this.CACHE_CONFIG.postCache.key as string);
    await redisService.set(
      this.CACHE_CONFIG.postCache.key as string,
      JSON.stringify(parsedPosts),
      this.CACHE_CONFIG.postCache.ttl as number,
    );
  }

  static async getPostCache() {
    const cachedPosts = await redisService.get(
      this.CACHE_CONFIG.postCache.key as string,
    );
    if (cachedPosts) {
      return JSON.parse(cachedPosts) as PostFlowDTO[];
    }
    return null;
  }
}
