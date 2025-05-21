import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-news-kiran.onrender.com/api',
});

//get articles api
export const getArticles = async (topic, sort_by, order) => {
    const { data } = await api.get('/articles', {
        params: {
            topic,
            sort_by,
            order,
        },
    });
    return data.articles;
};

//get article by id
export const getArticleById = async (article_id) => {
    const { data } = await api.get(`/articles/${article_id}`);
    return data.article;
};

//get comments by article id
export const getCommentsByArticleId = async (article_id) => {
    const { data } = await api.get(`/articles/${article_id}/comments`);
    return data.comments;
};

//patch article by id
export const patchArticleById = async (article_id, inc_votes) => {
    const { data } = await api.patch(`/articles/${article_id}`, {
        inc_votes,
    });
    return data.article;
};

//post comment by article id
export const postCommentByArticleId = async (article_id, username, body) => {
    const { data } = await api.post(`/articles/${article_id}/comments`, {
        username,
        body,
    });
    return data.comment;
};