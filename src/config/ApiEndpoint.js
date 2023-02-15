import { constants } from "buffer";
import Constants from "./Constants";

export default {
    LOGIN_USER: Constants.BASE_API_URL + 'user/login',
    DASHBOARD_LIST: Constants.BASE_API_URL + 'admin/dashboard',
    DASHBOARD_CHART:Constants.BASE_API_URL+'dashboard/review',
    ADMIN_MOVIE_REVIEW:Constants.BASE_API_URL+'admin/review/movie/list',
    ADMIN_REWIEW_LIST:Constants.BASE_API_URL+'admin/review/list',
    ADMIN_TOPBOX_ADD:Constants.BASE_API_URL+'admin/topbox/add',
    ADMIN_UPLOAD_FILE:Constants.BASE_API_URL+'upload/file',
    ADMIN_BLOGS_LIST:Constants.BASE_API_URL+'admin/blogs/list',
    USER_TOPBOX_VIEW:Constants.BASE_API_URL+'user/topbox/view',
    ADMIN_TOPBOX_EDIT:Constants.BASE_API_URL+'admin/topbox/edit',
    USER_TRENDINGMOVIE_LIST:Constants.BASE_API_URL+'user/trendingmovie/list',
    USER_FAQ_LIST:Constants.BASE_API_URL+'admin/faq/list',
    ADMIN_FAQ_ADD:Constants.BASE_API_URL+'admin/faq/add',
    ADMIN_FAQ_EDIT:Constants.BASE_API_URL+'admin/faq/edit',
    ADMIN_USER_LIST:Constants.BASE_API_URL+'admin/user/list',
    ADMIN_SUPPORT_LIST:Constants.BASE_API_URL+'admin/support/user/list',
    ADMIN_SUPPORT_SEND:Constants.BASE_API_URL+'admin/support/send',
}