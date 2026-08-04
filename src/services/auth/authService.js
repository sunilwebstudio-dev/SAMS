import { supabase } from "../../config/supabase";
import { generateApplicationId } from "../../utils/generateApplicationId";

export async function signUpUser(data) {

  const {

    fullName,

    mobile,

    email,

    password,

    businessType,

  } = data;

  // Generate Application ID
  const applicationId = generateApplicationId();

  // Create Auth User
  const { data: authData, error } =
    await supabase.auth.signUp({

      email,

      password,

      options: {

        emailRedirectTo:
          window.location.origin + "/login",

      },

    });

  if (error) {

    throw error;

  }

  // Save Profile
  const { error: profileError } =
    await supabase

      .from("profiles")

      .insert({

        auth_id: authData.user.id,

        application_id: applicationId,

        full_name: fullName,

        mobile,

        email,

        business_type: businessType,

      });

  if (profileError) {

    throw profileError;

  }

  return authData;

}

// ----------------------------

export async function loginUser(

  email,

  password

) {

  const { data, error } =
    await supabase.auth.signInWithPassword({

      email,

      password,

    });

  if (error) {

    throw error;

  }

  return data;

}

// ----------------------------

export async function logoutUser() {

  await supabase.auth.signOut();

}

// ----------------------------

export async function getCurrentUser() {

  const {

    data,

  } = await supabase.auth.getUser();

  return data.user;

}