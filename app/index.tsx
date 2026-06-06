import type * as React from "react";
import { Linking, Pressable, ScrollView, View } from "react-native";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBell,
  faCode,
  faCube,
  faDiagramProject,
  faKeyboard,
  faLayerGroup,
  faMobileScreenButton,
  faRocket,
  faShapes,
  faTerminal,
  faWind,
  faWindowMaximize,
} from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useThemeTokens } from "@/libs/theme";
import { FONTS } from "@/libs/utils/typography";
import { REGISTRY, type ShowcaseCategory } from "@/modules/showcase/registry";
import { useDrawer } from "@/modules/showcase/ui/drawer.store";
import { Header } from "@/modules/showcase/ui/Header";
import { Text } from "@/modules/ui";

const REPO_URL = "https://github.com/kuraykaraaslan/kui-native";

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: IconDefinition;
  title: string;
  children: React.ReactNode;
}) {
  const t = useThemeTokens();
  return (
    <View className="rounded-xl border border-border bg-surface-raised p-5">
      <View className="mb-3 flex-row items-center gap-2">
        <FontAwesomeIcon icon={icon} size={15} color={t.primary} />
        <Text variant="label" className="font-semibold">
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
}

function CommandLine({ command }: { command: string }) {
  return (
    <View className="flex-row items-center gap-2 rounded-lg bg-surface-sunken px-3 py-2">
      <Text className="text-xs text-text-disabled" style={{ fontFamily: FONTS.mono }}>
        $
      </Text>
      <Text className="text-xs text-text-primary" style={{ fontFamily: FONTS.mono }}>
        {command}
      </Text>
    </View>
  );
}

function TechItem({ icon, label, value }: { icon: IconDefinition; label: string; value: string }) {
  const t = useThemeTokens();
  return (
    <View className="flex-1 flex-row items-center gap-2.5 rounded-lg bg-surface-overlay px-3 py-2.5">
      <FontAwesomeIcon icon={icon} size={15} color={t.primary} />
      <View className="flex-1">
        <Text variant="caption" className="font-medium text-text-primary" numberOfLines={1}>
          {label}
        </Text>
        <Text className="text-[10px] text-text-secondary">{value}</Text>
      </View>
    </View>
  );
}

const LAYERS = [
  { num: "1", badge: "bg-info-subtle", text: "text-info-fg", path: "modules/ui/", desc: "Primitive components" },
  { num: "2", badge: "bg-primary-subtle", text: "text-primary", path: "modules/showcase/", desc: "Docs & live preview" },
  { num: "3", badge: "bg-success-subtle", text: "text-success-fg", path: "libs/", desc: "cn(), tokens, theme" },
];

const CATEGORIES: { c: ShowcaseCategory; icon: IconDefinition }[] = [
  { c: "Atoms", icon: faShapes },
  { c: "Forms", icon: faKeyboard },
  { c: "Feedback", icon: faBell },
  { c: "Overlays", icon: faWindowMaximize },
];

export default function Home() {
  const t = useThemeTokens();
  const openDrawer = useDrawer((s) => s.setOpen);
  const count = (c: ShowcaseCategory) => REGISTRY.filter((e) => e.category === c).length;

  return (
    <View className="flex-1 bg-surface-base">
      <Header title="KUInative" />
      <SafeAreaView edges={["bottom"]} className="flex-1">
        <ScrollView contentContainerClassName="p-4 gap-6" showsVerticalScrollIndicator={false}>
          {/* Hero */}
          <View className="gap-3">
            <View className="flex-row items-center gap-3">
              <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary">
                <Text className="text-xl font-bold text-primary-fg">K</Text>
              </View>
              <View className="flex-1">
                <Text variant="h1">KUInative</Text>
                <Text variant="bodySm">Minimal React Native component library</Text>
              </View>
            </View>
            <Text variant="bodySm" className="leading-relaxed">
              A production-ready component library built with Expo and NativeWind — a layered
              design system mirroring KUIreact, on shared semantic tokens, for real mobile apps.
            </Text>
          </View>

          {/* Quick start */}
          <SectionCard icon={faRocket} title="Quick Start">
            <View className="gap-2">
              <CommandLine command="npm install" />
              <CommandLine command="npm run android" />
            </View>
            <Text variant="caption" className="mt-3">
              Runs on Expo — Android, iOS, and web.
            </Text>
          </SectionCard>

          {/* Scripts */}
          <SectionCard icon={faTerminal} title="Scripts">
            <View className="gap-1.5">
              {[
                ["npm run android", "Android device / emulator"],
                ["npm run ios", "iOS simulator"],
                ["npm run web", "web preview"],
                ["npm run typecheck", "TypeScript check"],
              ].map(([cmd, desc]) => (
                <View key={cmd} className="flex-row items-center gap-2">
                  <View className="rounded bg-surface-sunken px-1.5 py-0.5">
                    <Text className="text-xs text-text-primary" style={{ fontFamily: FONTS.mono }}>
                      {cmd}
                    </Text>
                  </View>
                  <Text variant="caption" className="flex-1">
                    {desc}
                  </Text>
                </View>
              ))}
            </View>
          </SectionCard>

          {/* Tech stack */}
          <SectionCard icon={faLayerGroup} title="Tech Stack">
            <View className="gap-3">
              <View className="flex-row gap-3">
                <TechItem icon={faCube} label="Expo" value="SDK 55" />
                <TechItem icon={faMobileScreenButton} label="React Native" value="0.83" />
              </View>
              <View className="flex-row gap-3">
                <TechItem icon={faWind} label="NativeWind" value="4" />
                <TechItem icon={faCode} label="TypeScript" value="5" />
              </View>
            </View>
          </SectionCard>

          {/* Module layers */}
          <SectionCard icon={faDiagramProject} title="Module Layers">
            <View className="gap-2">
              {LAYERS.map((l) => (
                <View
                  key={l.num}
                  className="flex-row items-center gap-3 rounded-lg bg-surface-overlay px-3 py-2.5"
                >
                  <View className={`h-5 w-5 items-center justify-center rounded-full ${l.badge}`}>
                    <Text className={`text-[10px] font-bold ${l.text}`}>{l.num}</Text>
                  </View>
                  <Text className="text-xs text-text-primary" style={{ fontFamily: FONTS.mono }}>
                    {l.path}
                  </Text>
                  <Text variant="caption" className="flex-1" numberOfLines={1}>
                    {l.desc}
                  </Text>
                </View>
              ))}
            </View>
          </SectionCard>

          {/* Library / categories */}
          <SectionCard icon={faShapes} title="Library">
            <Text variant="caption" className="mb-3">
              {REGISTRY.length} components across {CATEGORIES.length} categories. Open the menu to
              browse them.
            </Text>
            <View className="gap-3">
              <View className="flex-row gap-3">
                {CATEGORIES.slice(0, 2).map(({ c, icon }) => (
                  <CategoryCard key={c} category={c} icon={icon} count={count(c)} onPress={() => openDrawer(true)} />
                ))}
              </View>
              <View className="flex-row gap-3">
                {CATEGORIES.slice(2).map(({ c, icon }) => (
                  <CategoryCard key={c} category={c} icon={icon} count={count(c)} onPress={() => openDrawer(true)} />
                ))}
              </View>
            </View>
          </SectionCard>

          {/* Footer */}
          <View className="flex-row items-center justify-between border-t border-border pt-4">
            <Text variant="caption">Built by Kuray Karaaslan · 0BSD</Text>
            <Pressable
              onPress={() => Linking.openURL(REPO_URL)}
              accessibilityRole="link"
              accessibilityLabel="View on GitHub"
              className="active:opacity-70"
            >
              <Text variant="caption" className="font-medium text-primary">
                GitHub ↗
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function CategoryCard({
  category,
  icon,
  count,
  onPress,
}: {
  category: ShowcaseCategory;
  icon: IconDefinition;
  count: number;
  onPress: () => void;
}) {
  const t = useThemeTokens();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${category}, ${count} components`}
      className="flex-1 rounded-lg border border-border bg-surface-base p-3 active:opacity-80"
    >
      <FontAwesomeIcon icon={icon} size={18} color={t.primary} />
      <Text variant="label" className="mt-2 font-semibold">
        {category}
      </Text>
      <Text variant="caption">{count} components</Text>
    </Pressable>
  );
}
