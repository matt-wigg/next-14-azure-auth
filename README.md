# Next-14-Azure-Auth

Next-14-Azure-Auth is a starter template for building secure [Next.js](https://nextjs.org/) v14+ [Tailwind CSS](https://tailwindcss.com/) apps with [Microsoft Entra ID authentication](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-whatis). It uses the [Next-Auth.js Library](https://next-auth.js.org/) for authentication and the [Microsoft Graph Client Library](https://github.com/microsoftgraph/msgraph-sdk-javascript) for fetching user data.

![image](https://github.com/user-attachments/assets/35c250b6-248e-486d-af8f-f7c688c53c87)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Azure Setup for Microsoft Entra ID](#azure-setup-for-microsoft-entra-id)
- [Local Development Setup](#local-development-setup)
- [Usage](#usage)
  - [Key Directories and Files](#key-directories-and-files)
- [Deployment](#deployment)

## Prerequisites

Before you begin, ensure you have the following installed and set up:

- [Node.js](https://nodejs.org/) (v18.17+) & [npm](https://www.npmjs.com/).
- [Git](https://git-scm.com/) for version control.
- An [Azure](https://azure.microsoft.com/) account with app registration permissions in Microsoft Entra ID.

## Azure Setup for Microsoft Entra ID

Follow these steps to configure Microsoft Entra ID for authentication:

### 1. Register the Application

1. Go to the [Azure portal](https://portal.azure.com/).
2. Navigate to **Microsoft Entra ID** > **App registrations** > **New registration**.
3. Enter a name for your application (e.g., `Next-14-Azure-Auth`).
4. Under **Supported account types**, select **Accounts in this organizational directory only**.
5. In the **Redirect URI** field, enter:  
   `http://localhost:3000/api/auth/callback/microsoft-entra-id`
6. Click **Register** to create the application.

### 2. Configure the Application

1. Go to the app's **Overview** page:
   - Copy the **Application (client) ID** and add it to your `.env` file as `AUTH_MICROSOFT_ENTRA_ID_ID`.
   - Copy the **Directory (tenant) ID** and add it to your `.env` file as `AUTH_MICROSOFT_ENTRA_ID_ISSUER`.
2. Navigate to **Certificates & secrets**:
   - Under **Client secrets**, click **New client secret**.
   - Add a description (e.g., `Next-14-Azure-Auth Secret`) and set an expiration period.
   - Copy the generated secret value and add it to your `.env` file as `AUTH_MICROSOFT_ENTRA_ID_SECRET`.

### 3. Set Up API Permissions

1. Go to **API permissions** > **Add a permission**.
2. Select **Microsoft Graph** > **Delegated permissions**.
3. Add the following permissions:
   - `User.Read` - Access user details.
   - `openid` - OpenID Connect authentication.
   - `email` - Access email addresses.
   - `profile` - Access basic profile information.
   - `offline_access` - Enable refresh tokens.
4. Click **Grant admin consent for [Your Organization]** to apply the permissions.

### 4. (Optional) Create an Enterprise Application

1. Navigate to **Azure Active Directory** > **Enterprise applications**.
2. Find your application by name and select it.
3. Under **Users and groups**, assign users or groups that should have access to the application.

## Local Development Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/matt-wigg/next-14-azure-auth.git
   cd next-14-azure-auth
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a (or edit the) `.env` file in the root directory:

   ```bash
   AUTH_SECRET=your_auth_secret
   AUTH_MICROSOFT_ENTRA_ID_ID=your_azure_client_id
   AUTH_MICROSOFT_ENTRA_ID_SECRET=your_azure_client_secret
   AUTH_MICROSOFT_ENTRA_ID_ISSUER=your_azure_tenant_id
   ```

   To generate the `AUTH_SECRET`, run:

   ```bash
   openssl rand -base64 32
   ```

4. **Start the Development Server**

   ```bash
   npm run dev
   ```

   Your application will be available at [http://localhost:3000](http://localhost:3000).

## Usage

> [!IMPORTANT]
> This application is configured for local development. Ensure your `.env` file is properly set up before proceeding.  

1. Visit [http://localhost:3000](http://localhost:3000) in your browser.
2. Click the "Sign in with Microsoft Entra ID" button to initiate the authentication process.
3. You will be redirected to the Microsoft Entra ID login page.
4. After successful login, you will be redirected back to the application, where you can see your user profile information.
5. You can sign out by clicking the "Sign out" button.

### Key Directories and Files

| **Category**        | **File/Directory**                             | **Description**                                                                 |
|---------------------|------------------------------------------------|---------------------------------------------------------------------------------|
| **Authentication**  | `src/app/api/[...nextauth]/route.ts`           | NextAuth.js routes. Customize providers, callbacks, or session behavior.        |
|                     | `src/services/msGraph.ts`                      | Microsoft Graph API helpers for fetching user data.                             |
|                     | `src/services/msEntraId.ts`                    | Microsoft Entra ID-specific authentication logic.                               |
|                     | `src/config/auth.config.ts`                    | Authentication configuration (e.g., provider settings).                         |
|                     | `src/middleware.ts`                            | Middleware for authentication and route protection.                             |
| **Components**      | `src/components/sign-in-form.tsx`              | Sign-in form UI.                                                                |
|                     | `src/components/sign-out-form.tsx`             | Sign-out button UI.                                                             |
| **Configuration**   | `src/config/routes.config.ts`                  | Route access settings for authenticated/unauthenticated pages.                  |
|                     | `src/config/auth.config.ts`                    | Authentication configuration (e.g., provider settings).                         |
|                     | `.env` / `.env.local`                          | Environment variables for sensitive credentials.                                |
| **Styling**         | `tailwind.config.ts`                           | Tailwind CSS configuration.                                                     |
| **Types**           | `src/types/`                                   | TypeScript definitions for authentication and middleware.                       |

## Deployment

Please refer to the [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for instructions on deploying your application to various platforms.
