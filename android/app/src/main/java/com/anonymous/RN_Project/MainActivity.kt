package com.anonymous.RN_Project

import android.os.Build
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled

class MainActivity : ReactActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        // Set the theme to AppTheme BEFORE onCreate to support
        // coloring the background, status bar, and navigation bar.
        setTheme(R.style.AppTheme)
        super.onCreate(null)
    }

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    override fun getMainComponentName(): String = "main"

    /**
     * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
     * which allows you to enable New Architecture with a single boolean flag [fabricEnabled].
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return DefaultReactActivityDelegate(
            this,
            mainComponentName,
            fabricEnabled
        )
    }

    /**
     * Align the back button behavior with Android S
     * where moving root activities to background instead of finishing activities.
     */
    override fun invokeDefaultOnBackPressed() {
        if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
            if (!moveTaskToBack(false)) {
                // For non-root activities, use the default implementation to finish them.
                super.invokeDefaultOnBackPressed()
            }
            return
        }
        // Use the default back button implementation on Android S
        super.invokeDefaultOnBackPressed()
    }
}
