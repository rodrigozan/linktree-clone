BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[tb_rwms_users] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [celular] NVARCHAR(1000) NOT NULL,
    [active] BIT NOT NULL CONSTRAINT [tb_rwms_users_active_df] DEFAULT 0,
    [role] NVARCHAR(1000) NOT NULL CONSTRAINT [tb_rwms_users_role_df] DEFAULT 'user',
    CONSTRAINT [tb_rwms_users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [tb_rwms_users_email_key] UNIQUE NONCLUSTERED ([email])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
