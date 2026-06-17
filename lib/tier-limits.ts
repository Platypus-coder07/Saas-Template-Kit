import prisma from "@/lib/prisma";

export async function validateTodoAction(
  userId: string,
  action: "CREATE_TODO" | "MOVE_TO_TODAY",
): Promise<{ allowed: boolean; error?: string }> {
  
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isSubscribed: true },
  });

  if (!user) return { allowed: false, error: "User not found" };
  if (user.isSubscribed) return { allowed: true };

  if (action === "CREATE_TODO") {
    const totalCount = await prisma.todo.count({ where: { userId } });
    if (totalCount >= 10) {
      return {
        allowed: false,
        error: "Free tier is limited to 10 total tasks. Please upgrade to unlock unlimited todos.",
      };
    }
  }

  if (action === "MOVE_TO_TODAY") {
    const todayCount = await prisma.todo.count({
      where: { userId, status: "TODAY" },
    });
    if (todayCount >= 3) {
      return {
        allowed: false,
        error: "Daily Focus is limited to 3 active tasks on the free tier to prevent overwhelm. Upgrade for unlimited focus items.",
      };
    }
  }

  return { allowed: true };
}
