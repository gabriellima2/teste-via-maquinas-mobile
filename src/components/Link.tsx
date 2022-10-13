import { TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import type { WithChildren } from "../types";

interface LinkProps extends WithChildren {
	accessibilityHint: string;
	style?: StyleProp<ViewStyle>;
	handleOnPress: () => void;
}

export const Link = ({ children, ...props }: LinkProps) => (
	<TouchableOpacity
		style={props.style}
		activeOpacity={0.6}
		accessibilityRole="link"
		accessibilityHint={props.accessibilityHint}
		onPress={props.handleOnPress}
	>
		{children}
	</TouchableOpacity>
);
