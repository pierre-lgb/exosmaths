import { createContext, ReactNode, useState } from "react"

type VisibilityContextValue = {
    visible: boolean
    setVisible: Function
}

export const VisibilityContext = createContext<VisibilityContextValue>({
    visible: false,
    setVisible: () => {}
})

export default function SidebarContextProvider({
    children
}: {
    children: ReactNode
}) {
    const [visible, setVisible] = useState<boolean>(false)

    const value = {
        visible,
        setVisible
    }

    return (
        <VisibilityContext.Provider value={value}>
            {children}
        </VisibilityContext.Provider>
    )
}
