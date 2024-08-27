# Next-14-Azure-Auth

Next-14-Azure-Auth is a starter template for building secure Next.js v14+ apps with Microsoft Entra ID authentication and a Microsoft Graph API integration. It uses the [NextAuth.js](https://next-auth.js.org/) library for authentication and [Microsoft Graph](https://docs.microsoft.com/en-us/graph/overview) for fetching user data.

## Prerequisites

Ensure the following are installed before running the application locally:

- [Node.js](https://nodejs.org/) (v16+) & [npm](https://www.npmjs.com/).
- Azure account with app registration permissions in Microsoft Entra ID.

## Azure Setup for Microsoft Entra ID

1. **Register the Application**

   1. Navigate to the Azure portal.

   2. Go to **Microsoft Entra ID** > **App registrations** > **New registration**.

   3. Name your application (e.g., `Next-14-Azure-Auth`).

   4. Choose "Accounts in this organizational directory only" for **Supported account types**.

   5. Set the **Redirect URI** to `http://localhost:3000/api/auth/callback/microsoft-entra-id` and click **Register**.

2. **Configure the Application**

   1. On the app's overview page, copy the **Application (client) ID** and **Directory (tenant) ID**—you’ll need these in your `.env.local` file.

   2. Go to **Certificates & secrets** > **Client secrets** > **New client secret**.

   3. Add a description (e.g., `Next-14-Azure-Auth Secret`), set the expiration, and copy the generated secret value to your `.env.local` file.

3. **Set Up API Permissions**

   1. Navigate to **API permissions** > **Add a permission**.

   2. Select **Microsoft Graph** and add these permissions:

      - `User.Read`
      - `openid`
      - `email`
      - `profile`

   3. Click **Grant admin consent** to apply these permissions.

4. **(Optional) Create an Enterprise Application**

   1. To assign users/groups to the application:

   2. Go to **Azure Active Directory** > **Enterprise applications**.

   3. Find your application by name.

   4. Under **Users and groups**, assign the relevant users/groups.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/matt-wigg/next-14-azure-auth.git
   cd next-14-azure-auth
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

   Or, if using yarn:

   ```bash
   yarn install
   ```

3. **Set Up Environment Variables**

   Create a `.env.local` file in the root of your project and add the following variables:

   ```bash
   AUTH_SECRET=your_auth_secret
   AUTH_MICROSOFT_ENTRA_ID_ID=your_azure_client_id
   AUTH_MICROSOFT_ENTRA_ID_SECRET=your_azure_client_secret
   AUTH_MICROSOFT_ENTRA_ID_TENANT_ID=your_azure_tenant_id
   ```

4. **Run the Application**

   Start the development server:

   ```bash
   npm run dev
   ```

   Or, with yarn:

   ```bash
   yarn dev
   ```

   Your application will run at `http://localhost:3000`.
