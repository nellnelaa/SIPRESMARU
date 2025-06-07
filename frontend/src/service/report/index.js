export const getAchievements = async ({
  full_name,
  grade,
  tag,
  title,
  category_type,
  organizer_name,
  search,
}) => {
  let params = {};
  if (search) {
    params.search = search;
  }
  if (full_name) {
    params.full_name = full_name;
  }
  if (grade) {
    params.grade = grade;
  }
  if (tag) {
    params.tag = tag;
  }
  if (title) {
    params.title = title;
  }
  if (category_type) {
    params.category_type = category_type;
  }
  if (organizer_name) {
    params.organizer_name = organizer_name;
  }
  let url =
    `${import.meta.env.VITE_API_URL}/achievements?` +
    new URLSearchParams(params).toString();

  const response = await fetch(url, {
    method: "GET",
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }
  return result?.data;
};

export const getDetailAchievement = async (id) => {
  let url = `${import.meta.env.VITE_API_URL}/students/${id}`;

  const response = await fetch(url, {
    method: "GET",
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }

  return result?.data;
};

export const createReport = async (request) => {

  const formData = new FormData();
  formData.append("name", request.name);
  formData.append("email", request.email);
  formData.append("text", request.text);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/reports`, {
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }
  return result?.data;
};

export const updateStudent = async (id, request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("name", request.name);
  formData.append("nick_name", request.nickName);
  formData.append("class_id", request.classId);
  formData.append("university_id", request.universityId);
  if (request.profilePicture) {
    formData.append("profile_picture", request.profilePicture);
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/students/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: formData,
    }
  );

  // get the data if fetching succeed!
  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }

  return result?.data;
};

export const deleteStudent = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/students/${id}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });

  // get data
  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }

  return result?.data;
};
