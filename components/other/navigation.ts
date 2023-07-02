import { CommonActions, NavigationContainerRef } from "@react-navigation/native";

let navigatorRef: NavigationContainerRef<any>; // Specify the type argument (e.g., 'any')

export function setNavigator(ref: NavigationContainerRef<any>) { // Specify the type argument (e.g., 'any')
  navigatorRef = ref;
}

export function navigate(routeName: string, params?: object) {
  navigatorRef.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: params
    })
  );
}
