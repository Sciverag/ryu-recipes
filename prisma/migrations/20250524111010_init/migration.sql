-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT NOT NULL DEFAULT '/images/default-user.jpg',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL DEFAULT '/images/default-cover.jpg',
    "videoUrl" TEXT,
    "authorId" TEXT NOT NULL,
    "ingredients" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "imageUrl" TEXT,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nutrition" (
    "id" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "carbs" DOUBLE PRECISION NOT NULL,
    "fats" DOUBLE PRECISION NOT NULL,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "Nutrition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diet" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Diet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DietDay" (
    "id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "carbs" DOUBLE PRECISION NOT NULL,
    "fats" DOUBLE PRECISION NOT NULL,
    "dietId" TEXT NOT NULL,

    CONSTRAINT "DietDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DietApplication" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dietId" TEXT NOT NULL,

    CONSTRAINT "DietApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeSelection" (
    "id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "recipeId" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "RecipeSelection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "recipeId" TEXT,
    "dietId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "recipeId" TEXT,
    "dietId" TEXT,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Nutrition_recipeId_key" ON "Nutrition"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "DietApplication_userId_key" ON "DietApplication"("userId");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nutrition" ADD CONSTRAINT "Nutrition_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diet" ADD CONSTRAINT "Diet_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietDay" ADD CONSTRAINT "DietDay_dietId_fkey" FOREIGN KEY ("dietId") REFERENCES "Diet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietApplication" ADD CONSTRAINT "DietApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietApplication" ADD CONSTRAINT "DietApplication_dietId_fkey" FOREIGN KEY ("dietId") REFERENCES "Diet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeSelection" ADD CONSTRAINT "RecipeSelection_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeSelection" ADD CONSTRAINT "RecipeSelection_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "DietApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_dietId_fkey" FOREIGN KEY ("dietId") REFERENCES "Diet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_dietId_fkey" FOREIGN KEY ("dietId") REFERENCES "Diet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
