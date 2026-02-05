import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigations/RootStackParamList";
import { COLORS } from "../../constants/theme";
import { IMAGES } from "../../constants/Images";
import LinearGradient from "react-native-linear-gradient";
import * as Progress from "react-native-progress";
import { useTheme } from "@react-navigation/native";

type SplashScreenProps = StackScreenProps<RootStackParamList, 'splash'>;

const Splash = ({ navigation }: SplashScreenProps) => {

    const theme = useTheme();
    const {colors} : {colors : any} = theme;
    
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Animate progress from 0 → 1 in 5 seconds
        let interval = setInterval(() => {
        setProgress((prev) => {
            if (prev >= 1) {
            clearInterval(interval);
            navigation.replace("Onbording");
            return 1;
            }
            return prev + 0.02; // (0.02 * 50) = ~5s
        });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={{ backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, flex: 1, justifyContent: "center", alignItems: "center" }}>
            <LinearGradient
                colors={[theme.dark ? COLORS.darkwhite : COLORS.white, theme.dark ? '#290B56': "#F5EFFF"]}
                style={{
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            />

            <Image
                resizeMode="contain"
                style={{ width: 172 }}
                source={theme.dark ? IMAGES.Darklogo : IMAGES.logo}
            />

            {/* Progress bar below logo */}
            <View style={{ marginTop: 5 }}>
                <Progress.Bar
                    progress={progress}
                    width={80}
                    color={theme.dark ? '#9654F4': COLORS.primary || theme.dark ? '#9654F4': COLORS.primary}
                    unfilledColor={ theme.dark ? '#3C0C81':'#F5EFFF'}
                    borderWidth={0}
                    height={6}
                    borderRadius={10}
                    animated={true}
                />
            </View>

            <Image
                style={{
                    width: "100%",
                    height: 84,
                    position: "absolute",
                    bottom: 25,
                }}
                source={IMAGES.SplashShap}
                tintColor={theme.dark ? '#3C0C81': '#E0CAFF'}
            />
        </View>
    );
};

export default Splash;
