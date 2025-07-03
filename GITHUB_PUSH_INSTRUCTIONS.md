# How to Push Your Code to GitHub

1. **Check your remote**
   ```sh
   git remote -v
   ```
   If `origin` is set to your repo (`https://github.com/RashmikaDhanushan/Contacts-Dashboard-App.git`), continue.  
   If not, set it with:
   ```sh
   git remote add origin https://github.com/RashmikaDhanushan/Contacts-Dashboard-App.git
   ```

2. **Add all changes**
   ```sh
   git add .
   ```

3. **Commit your changes**
   ```sh
   git commit -m "Your commit message"
   ```

4. **Push to GitHub**
   ```sh
   git push origin main
   ```
   If your branch is not `main`, use your branch name instead.

5. **If you get errors about branch names**
   ```sh
   git branch -M main
   git push -u origin main
   ```

Now your code is on GitHub!
