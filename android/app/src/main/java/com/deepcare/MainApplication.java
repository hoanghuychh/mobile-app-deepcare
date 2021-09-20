package com.deepcare;

import android.app.Application;
import com.facebook.react.ReactApplication;
import com.sha256lib.Sha256Package;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.opentokreactnative.OTPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.codegulp.invokeapp.ReactNativeInvokeAppPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
            new Sha256Package(),
              new FBSDKPackage(),
              new RNGestureHandlerPackage(),
              new OTPackage(),
              new RNFirebasePackage(),
              new ReactNativeInvokeAppPackage(),
              new VectorIconsPackage(),
              new RNI18nPackage(),
              new RNFirebaseMessagingPackage(), // <-- Add this line
              new RNFirebaseNotificationsPackage(), // <-- Add this line
              new RNFirebaseAuthPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }

}

