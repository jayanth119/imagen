import { getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification, 
  sendPasswordResetEmail } from "firebase/auth";
import { Firebaseapp, admin } from "../setup/firebase.js";

const auth = getAuth(Firebaseapp);

class AuthController {
  static async register(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async logout() {
    try {
      await signOut(auth);
    
    } catch (error) {
      throw error;
    }
  }
    static async sendVerificationEmail(user) {
        try {
        await sendEmailVerification(user);
        } catch (error) {
        throw error;
        }
    }
    static async resetPassword(email) {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            throw error;
        }
    }

}



const  loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }
    
    try {
        const user = await AuthController.login( email, password);
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Login failed. Please check your credentials." });
    }

}   


const registerUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }
    
    try {
        const user = await AuthController.register(email, password);
        // add cookie or token if needed
        res.cookie("access_token", user.accessToken, { httpOnly: true, secure: true });
        await AuthController.sendVerificationEmail(user); 
        
        res.status(201).json({ message: "Registration successful. Please verify your email.", user });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Registration failed. Please try again." });
    }
}

const logoutUser = async (req, res) => {
    try {
        await AuthController.logout();
        // Clear the cookie or token if you're using one
        res.clearCookie("access_token"); 
        res.status(200).json({ message: "Logout successful" });

    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ error: "Logout failed. Please try again." });
    }
}

const resetPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Email is required." });
    }
    
    try {
        await AuthController.resetPassword(email);
        res.status(200).json({ message: "Password reset email sent." });
    } catch (error) {
        console.error("Password reset error:", error);
        res.status(500).json({ error: "Failed to send password reset email." });
    }
}



export { AuthController, loginUser , registerUser , logoutUser , resetPassword };