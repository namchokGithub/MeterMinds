import { prisma } from "@/lib/prisma";

export async function getSetting(key: string) {
  return prisma.appSetting.findUnique({
    where: {
      key,
    },
  });
}

export async function getSettingValue(
  key: string,
  fallback: string,
): Promise<string> {
  const setting = await prisma.appSetting.findUnique({
    where: {
      key,
    },
  });

  return setting?.value ?? fallback;
}
