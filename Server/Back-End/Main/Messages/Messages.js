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
      USER_TYPE_ID: "Invalid User Account's Type!",
      USERS_LIST: "You have no privilege to retrieve users list!",
      USER_CREATION: "You have no privilege to create a user account!",
      SA_CREATION: "You can't create a super admin account!",
      USER_DELETION: "You have no privilege to delete a user account!",
      SA_DELETION: "You can't delete a super admin account!",
      USER_TYPE_CHANGE:
        "You have no privilege to change a user account's type!",
      SA_TYPE_CHANGE: "You can't change a super admin account's type!",
      SA_TYPE_ASSIGN: "You can't assign a super admin role (account's type)!",
      ADMIN_TYPE_CHANGE:
        "You have no privilege to change an admin's account type!",
      ADMIN_TYPE_ASSIGN:
        "You have no privilege to assign admin roles (account's types)!",
      LOCATION_CHANGE: "You have no privilege to change a user's location!",
      ADMIN_LOCATION_CHANGE:
        "You have no privilege to change location of admins!",
      SA_LOCATION_CHANGE: "You can't change location of super admins!",
      PASSWORD_CHECK: "Incorrect Password!",
      PASSWORD_CONFIRMATION: "Please confirm your new password!",
      PASSWORD_UNCHANGED: "Please enter a new password!",
      SUCCESSFULL_PASSWORD_CHANGE: "Your password changed successfully.",
      SUCCESSFULL_CREATION: "User account created successfully.",
      SUCCESSFULL_UPDATE: "Your data updated successfully.",
      SUCCESSFULL_DELETETION: "'s account deleted successfully.",
      SUCCESSFULL_USER_TYPE_CHANGE:
        "User account's type changed successfully to ",
      SUCCESSFULL_LOCATION_CHANGE: "User's location changed successfully to ",
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
      USER_TYPE_ID: "نوع حساب المستخدم غير صالح",
      USERS_LIST: "ليست لديك( ِ) الصلاحية للحصول على اللائحة بالمستخدمين",
      USER_CREATION: "ليست لديك( ِ) الصلاحية لإضافة حساب المستخدم",
      SA_CREATION: "لا يمكنك( ِ) إضافة مسؤول أعلى",
      USER_DELETION: "ليست لديك( ِ) الصلاحية لإزالة حساب المستخدم",
      SA_DELETION: "ليست لديك( ِ) الصلاحية لإزالة مسؤول أعلى",
      USER_TYPE_CHANGE: "ليست لديك( ِ) الصلاحية لتغيير نوع حساب المستخدم",
      SA_TYPE_CHANGE: "لا يمكنك( ِ) تغيير نوع حساب المسؤول الأعلى",
      SA_TYPE_ASSIGN: "لا يمكنك( ِ) إضافة دور (نوع حساب) مسؤول أعلى",
      ADMIN_TYPE_CHANGE: "ليست لديك( ِ) الصلاحية لتغيير نوع حساب مسؤول",
      ADMIN_TYPE_ASSIGN: "ليست لديك( ِ) الصلاحية لإضافة دور (نوع حساب) مسؤول",
      LOCATION_CHANGE: "ليست لديك( ِ) الصلاحية لتغيير موقع المستخدم",
      ADMIN_LOCATION_CHANGE: "ليست لديك( ِ) الصلاحية لتغيير موقع إحد المسؤولين",
      SA_LOCATION_CHANGE: "لا يمكنك( ِ) تغيير موقع مسؤول أعلى",
      PASSWORD_CHECK: "كلمة المرور غير صحيحة",
      PASSWORD_CONFIRMATION: "رجاءً قم(ي) بتأكيد كلمة المرور الجديدة",
      PASSWORD_UNCHANGED: "رجاءً قم(ي) بإدخال كلمة مرور جديدة",
      SUCCESSFULL_PASSWORD_CHANGE: "تم تغيير كلمة مرورك( ِ) بنجاح",
      SUCCESSFULL_CREATION: "تم إضافة حساب المستخدم بنجاح",
      SUCCESSFULL_UPDATE: "تم تعديل بياناتك( ِ) بنجاح",
      SUCCESSFULL_DELETETION: " تمت بنجاح عملبة حذف حساب",
      SUCCESSFULL_USER_TYPE_CHANGE: "تم تعديل نوع حساب المستخدم بنجاح إلى ",
      SUCCESSFULL_LOCATION_CHANGE: "تم تعديل موقع المستخدم إلى ",
    },
  },
};

module.exports = MESSAGES;
