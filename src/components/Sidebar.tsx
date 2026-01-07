import type { ReactNode } from "react"
import type { View } from "../types"

interface SidebarProps {
    view: View
    onViewChange: (view: View) => void
    favoritesCount: number
}

interface NavButtonProps {
    icon: ReactNode
    active: boolean
    onClick: () => void
    badge?: number
}

function NavButton({ icon, active, onClick, badge }: NavButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`
                relative w-8 h-8 flex items-center justify-center rounded-lg
                transition-all duration-150
                ${active
                    ? "bg-theme-bg text-theme-text shadow-sm"
                    : "text-theme-text-tertiary hover:text-theme-text hover:bg-theme-bg/50"
                }
            `}
        >
            {icon}
            {badge !== undefined && badge > 0 && (
                <span className="absolute top-0 right-0 min-w-[12px] h-[12px] flex items-center justify-center bg-[var(--framer-color-tint,#0099FF)] text-white text-[7px] font-bold rounded-full">
                    {badge > 9 ? "9+" : badge}
                </span>
            )}
        </button>
    )
}

export function Sidebar({ view, onViewChange, favoritesCount }: SidebarProps) {
    return (
        <nav className="w-14 flex-shrink-0 bg-theme-bg-secondary/50 flex flex-col items-center py-3 gap-1 overflow-visible">
            <NavButton
                icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                }
                active={view === "curves"}
                onClick={() => onViewChange("curves")}
            />
            <NavButton
                icon={
                    <svg width="14" height="14" viewBox="0 0 12 12" fill={view === "favorites" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                        <path d="M6 10.5C6 10.5 1.5 7.5 1.5 4.5C1.5 2.5 3 1.5 4.5 1.5C5.5 1.5 6 2 6 2C6 2 6.5 1.5 7.5 1.5C9 1.5 10.5 2.5 10.5 4.5C10.5 7.5 6 10.5 6 10.5Z" />
                    </svg>
                }
                active={view === "favorites"}
                onClick={() => onViewChange("favorites")}
                badge={favoritesCount}
            />
            <NavButton
                icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                }
                active={view === "add"}
                onClick={() => onViewChange("add")}
            />
            <div className="mt-auto">
                <NavButton
                    icon={
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                        </svg>
                    }
                    active={view === "settings"}
                    onClick={() => onViewChange("settings")}
                />
            </div>
        </nav>
    )
}
