# Next-14-Azure-Auth

Next-14-Azure-Auth is a starter template for building secure Next.js v14+ apps with Microsoft Entra ID authentication and a Microsoft Graph API integration. It uses the [NextAuth.js](https://next-auth.js.org/) library for authentication and [Microsoft Graph](https://docs.microsoft.com/en-us/graph/overview) for fetching user data.

## Prerequisites

Ensure the following are installed before running the application locally:

- [Node.js](https://nodejs.org/) (v16+) & [npm](https://www.npmjs.com/).
- Azure account with app registration permissions in Microsoft Entra ID.

## Azure Setup for Microsoft Entra ID

1. **Register the Application**

   - Navigate to the [Azure portal](https://portal.azure.com/).
   - Go to **Microsoft Entra ID** > **App registrations** > **New registration**.
   - Name your application (e.g., `Next-14-Azure-Auth`).
   - For **Supported account types**, choose **Accounts in this organizational directory only**.
   - In the **Redirect URI** field, set the following value:  
     `http://localhost:3000/api/auth/callback/microsoft-entra-id`
   - Click **Register** to create the application.

2. **Configure the Application**

   - Once registered, navigate to the app's overview page:
     - Copy the **Application (client) ID** and set it in your `.env.local` file as `AUTH_MICROSOFT_ENTRA_ID_ID`.
     - Copy the **Directory (tenant) ID** and set it in your `.env.local` file as `AUTH_MICROSOFT_ENTRA_ID_ISSUER`.

   - Next, go to **Certificates & secrets**:
     - Under **Client secrets**, click **New client secret**.
     - Provide a description (e.g., `Next-14-Azure-Auth Secret`) and choose an expiration period.
     - Once created, copy the generated secret value and set it in your `.env.local` file as `AUTH_MICROSOFT_ENTRA_ID_SECRET`.

3. **Set Up API Permissions**

   - Navigate to **API permissions** > **Add a permission**.
   - Choose **Microsoft Graph** > **Delegated permissions**.
   - Add the following permissions:
     - `User.Read`
     - `openid`
     - `email`
     - `profile`
   - After adding the permissions, click **Grant admin consent for [Your Organization]** to apply them.

4. **(Optional) Create an Enterprise Application**

   - To manage access to the application:
     - Go to **Azure Active Directory** > **Enterprise applications**.
     - Find your application by name and select it.
     - Under **Users and groups**, assign users or groups that should have access to the application.

5. **Environment Variables Setup**

   Your `.env.local` file should include the following variables:

   ```bash
   AUTH_SECRET=your_auth_secret
   AUTH_MICROSOFT_ENTRA_ID_ID=your_azure_client_id
   AUTH_MICROSOFT_ENTRA_ID_SECRET=your_azure_client_secret
   AUTH_MICROSOFT_ENTRA_ID_ISSUER=your_azure_tenant_id
   ```

6. **Generate the AUTH_SECRET**

   To generate the `AUTH_SECRET`, run the following command:

   ```bash
   openssl rand -base64 32
   ```

7. **Run the Application**

   Start the development server:

   ```bash
   npm run dev
   ```

   Or, with yarn:

   ```bash
   yarn dev
   ```

   Your application will run at `http://localhost:3000`.
