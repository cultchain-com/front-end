import axios from "axios";
export default defineSitemapEventHandler(async (e) => {
  let postList: any[] = [];
  let eventList: any[] = [];
  let decisionList: any[] = [];
  await axios.get(`https://cultchain.com/api/blog/posts/`).then((res) => {
    postList = res.data.map((post: any) => {
      return {
        _path: `/blog/post-${post.id}`,
        modifiedAt: post.created_at,
      };
    });
  });
  await axios.get(`https://cultchain.com/api/indexer/events/`).then((res) => {
    eventList = res.data.map((event: any) => {
      return {
        _path: `/events/event-${event.id}`,
        modifiedAt: event.created_at,
      };
    });
  });
  await axios
    .get(`https://cultchain.com/api/indexer/committees/`)
    .then((res) => {
      decisionList = res.data.map((decision: any) => {
        return {
          _path: `/events/validator-decision-${decision.id}`,
          modifiedAt: decision.related_object.created_at,
        };
      });
    });
  //   committees
  const list = await Promise.all(postList.concat(eventList, decisionList));
  return list.map((p) => {
    return {
      loc: p._path,
      lastmod: p.modifiedAt,
    };
  });
});
