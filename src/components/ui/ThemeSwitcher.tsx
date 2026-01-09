import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

export function ThemeSwitcher({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme()

    const themes = [
        { name: "light", icon: Sun },
        { name: "dark", icon: Moon },
        { name: "system", icon: Monitor },
    ] as const

    return (
        <div className={cn("flex items-center gap-1 p-1 bg-accent/50 rounded-xl", className)}>
            {themes.map((t) => {
                const Icon = t.icon
                const isActive = theme === t.name
                return (
                    <button
                        key={t.name}
                        onClick={() => setTheme(t.name)}
                        className={cn(
                            "flex-1 flex items-center justify-center py-2 px-3 rounded-lg transition-all duration-200",
                            isActive
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                        )}
                        title={`${t.name.charAt(0).toUpperCase() + t.name.slice(1)} Mode`}
                    >
                        <Icon size={16} className={cn(isActive && "text-foreground")} />
                    </button>
                )
            })}
        </div>
    )
}
