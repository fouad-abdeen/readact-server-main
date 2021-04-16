"use strict";

const MESSAGES = {
  EN: {
    USER: {
      USERNAME: "Username exists!",
      PASSWORD: "Weak Password!",
      FIRST_NAME: "Invalid First Name!",
      LAST_NAME: "Invalid Last Name!",
      EMAIL: "Invalid Email Address!",
      MOBILE: "Invalid Mobile Number!",
      ADDRESS: "Invalid Address!",
      USERS_LIST: "You have no privilege to retrieve users list!",
      USER_CREATION: "You have no privilege to create a user account!",
      SA_CREATION: "You can't create a super admin account!",
      USER_DELETION: "You have no privilege to delete a user account!",
      SA_DELETION: "You can't delete a super admin account!",
      SUCCESSFULL_CREATION: "User account created successfully.",
      SUCCESSFULL_UPDATE: "Your data updated successfully.",
      SUCCESSFULL_DELETETION: "'s account deleted successfully.",
    },
  },
  AR: {
    USER: {
      USERNAME: "اسم المستخدم موجود مسبقًا",
      PASSWORD: "كلمة السر ضعيفة",
      FIRST_NAME: "الاسم الأول غير صالح",
      LAST_NAME: "الاسم الأخير غير صالح",
      EMAIL: "البريد الإلكتروني غير صالح",
      MOBILE: "رقم الخلوي غير صالح",
      ADDRESS: "عنوان المنزل غير صالح",
      USERS_LIST: "ليست لديك الصلاحية للحصول على اللائحة بالمستخدمين",
      USER_CREATION: "ليست لديك الصلاحية لإضافة حساب المستخدم",
      SA_CREATION: "لا يمكنك إضافة مسؤول أعلى",
      USER_DELETION: "ليست لديك الصلاحية لإزالة حساب المستخدم",
      SA_DELETION: "ليست لديك الصلاحية لإزالة مسؤول أعلى",
      SUCCESSFULL_CREATION: "تم إضافة حساب المستخدم بنجاح",
      SUCCESSFULL_UPDATE: "تم تعديل بياناتك بنجاح",
      SUCCESSFULL_DELETETION: " تمت بنجاح عملبة حذف حساب",
    },
  },
};

module.exports = MESSAGES;
