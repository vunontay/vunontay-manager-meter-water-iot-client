export const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleString("vi-VN");
};
