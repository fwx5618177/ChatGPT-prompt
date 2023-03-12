export const getStickiness = (comments) => {
  const userMap = new Map(); // 存储每个用户的评论数、点赞数、评论占比
  const totalComments = comments.length; // 所有评论的数量

  // 统计每个用户的评论数、点赞数
  comments.forEach((comment) => {
    const { member, like } = comment;
    if (userMap.has(member)) {
      const { comments, likes } = userMap.get(member);
      userMap.set(member, {
        comments: comments + 1,
        likes: likes + like,
      });
    } else {
      userMap.set(member, {
        comments: 1,
        likes: like,
      });
    }
  });

  // 计算每个用户的评论占比和平均点赞数
  const users = Array.from(userMap.keys()).map((member) => {
    const { comments, likes } = userMap.get(member);
    const likePerComment = comments ? likes / comments : 0;
    const commentRatio = comments / totalComments;
    return {
      member,
      comments,
      likePerComment,
      commentRatio,
    };
  });

  // 根据评论数、平均点赞数和评论占比计算每个用户的粘度分数
  users.forEach((user) => {
    const { comments, likePerComment, commentRatio } = user;
    user.stickiness = comments * likePerComment * commentRatio;
  });

  // 按照粘度分数从高到低排序
  users.sort((a, b) => b.stickiness - a.stickiness);

  return users;
};

export const merge = (infos, stickiness) => {
  const result = [...infos, ...stickiness].reduce((acc, curr) => {
    const { member, ...rest } = curr
    acc[member] = {
        ...acc[member],
        ...rest,
    }

    return acc
  }, {})

  return Object.entries(result).map(ci => ({
    memeber: ci[0],
    uname: ci[1].uname,
    stickiness: ci[1].stickiness,
    msg: ci[1].msg,
  }))
};
